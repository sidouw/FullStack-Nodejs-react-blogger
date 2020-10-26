const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const pool = require('./db')

let count = 0

passport.serializeUser((user, done) => {

    pool.query(`SELECT * FROM users
        WHERE gid=$1`, [ user.gid ],
            (q_err, q_res) => {
                if (q_res.rows.length>0) {
                    done(null, q_res.rows[0].uid);
                }else{
                    pool.query(`INSERT INTO users(gid,author,date_created,username,picture)
                        VALUES($1, $2,NOW(),$3,$4)
                        ON CONFLICT DO NOTHING RETURNING *`, [user.gid,false,user.name,user.picture],
                            (q_err, q_res) => {
                                if (!q_err){
                                    done(null, q_res.rows[0].uid);
                                }else{
                                    console.log(q_err);
                                    done(null,false)
                                }
                        })
                    }
            })
    });

passport.deserializeUser((uid, done) => {
    pool.query(`SELECT * FROM users
        WHERE uid=$1`, [ uid ],
            (q_err, q_res) => {
                if (q_res.rows.length>0) {
                    done(null, q_res.rows[0]);
                }else{
                    done(null,false)
                }
                    // console.log(count);
                    // count +=1
                }
            )
    
    
});
passport.use(
    new GoogleStrategy({
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret,
        callbackURL : '/auth/redirect'

    },(accessToken,RefreshToken,profile,done)=>{
        user = {
            gid:profile.id,
            name : profile.displayName,
            picture : profile.photos[0].value
        }
        // console.log(profile)
        //do db stuff
        done(null,user)
    })
)