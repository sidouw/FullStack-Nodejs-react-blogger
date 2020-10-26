const express = require('express');
const router = express.Router();
const pool = require('../config/db')
/* GET users listing. */
router.get('/', function(req, res) {
  const user = {...req.user}
  if(Object.keys(user).length){
    delete user.gid
    return res.send(JSON.stringify(user));
  }
  res.send(false);
});

router.delete('/delete',(req,res)=>{
  const uid = req.query.uid

  if (!req.user || req.user.uid != uid) return res.status(400).send()
  // if (!req.user || req.user.uid !== uid) return res.status(400).send()
  req.logout();
  
  pool.query(`DELETE FROM comments
  WHERE user_id = $1`, [uid],
  (q_err, q_res) => {

      pool.query(`DELETE FROM posts WHERE user_id = $1`, [ uid ],
        (q_err, q_res) => {
          pool.query(`DELETE FROM users WHERE uid = $1`, [ uid ],
          (q_err, q_res) => {
            
            res.send('Deleted')
            // console.log(q_err)
        })
          
          // console.log(q_err)
      })
  })

 
})
module.exports = router;
