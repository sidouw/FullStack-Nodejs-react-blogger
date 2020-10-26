const express = require('express')
const router = express.Router()
const pool = require('../config/db')
const axios = require('axios');
const FormData = require('form-data');
const imgurkey = require('./imgur_keys')
/*
    POSTS ROUTES SECTION
*/

const uploadToImagur = async (image)=>{
  // return false
  var base64Data=''

  // base64Data = image.replace(/^data:image\/png;base64,/, "")
  if (image.includes('png')) {
    base64Data = image.replace(/^data:image\/png;base64,/, "")
  }else if (image.includes('jpeg')) {
    base64Data = image.replace(/^data:image\/jpeg;base64,/, "")
  } else if (image.includes('jpg')) {
    base64Data = image.replace(/^data:image\/jpg;base64,/, "")
  }else {
    return false
  }

  // console.log(base64Data+'____________________');
    const rimage ={}
    var data = new FormData();
    data.append('image',base64Data);
    data.append('type','base64');

    var config = {
      method: 'post',
      url: 'https://api.imgur.com/3/upload',
      headers: { 
        Authorization: `Client-ID ${imgurkey.Client_ID}`, 
        ...data.getHeaders()
      },
      data : data
    };

    try {
      const response = await  axios(config)
      // for imageDeletion
      rimage.deletehash = response.data.data.deletehash //Add delete Image on Post delete
      rimage.link = response.data.data.link
      return rimage
    } catch (error) {
      console.log(error.response.statusText);
      return false
      
    }

}

router.get('/allposts', (req, res) => {

  pool.query(`SELECT pid, title,picture,user_id,author,date_created,likes,category FROM posts
              WHERE published = true ORDER BY date_created DESC`, (q_err, q_res) => {
      // console.log(q_res.rows)
      res.json(q_res.rows)
  })
})

// Latest Posts
router.get('/latest', (req, res) => {

  pool.query(`SELECT pid, title,picture,user_id,author,date_created,likes,category FROM posts
              WHERE published = true ORDER BY date_created DESC LIMIT 4`, (q_err, q_res) => {
      // console.log(q_res.rows)
      res.json(q_res.rows)
  })
})

// trending Posts
router.get('/trending', (req, res) => {

  pool.query(`SELECT pid, title,picture,user_id,author,date_created,likes,category FROM posts
              WHERE published = true ORDER BY array_length(like_user_id,1) ASC LIMIT 5`, (q_err, q_res) => {
      // console.log(q_res.rows)
      res.json(q_res.rows)
  })
})

router.get('/getpost', (req, res) => {
  const post_id = req.query.pid
  // console.log(post_id);
  pool.query(`SELECT pid, title,body,user_id,author,date_created,picture,likes,category,published,like_user_id FROM posts
              WHERE pid=$1`, [ post_id ],
              (q_err, q_res) => {
                if (q_err) return res.status(400).json(q_err)
                if (q_res.rowCount>0){ 
                return res.json(q_res.rows[0]);
              }
              return res.status(404).send('Post Not Found');
      })
} )


router.get('/userposts', (req, res) => {
  // console.log(req.user)
  if (!req.user || !req.user.author) return res.status(400).send() 
  const user_id = req.query.uid
  pool.query(`SELECT pid, title,user_id,author,date_created,likes,category FROM posts
              WHERE user_id=$1`, [ user_id ],
              (q_err, q_res) => {
                if (q_err) return res.status(400).json(q_err)
                if (q_res.rowCount>0){ 
                return res.json(q_res.rows);
              }
              return res.status(404).send('Post Not Found');
      })
} )


// Add post
router.post('/save', async (req, res) => {
  
  if (!req.user || !req.user.author) return res.status(400).send() 
  if(req.user.uid === req.body.user_id ){

    if (!req.body.pid) {
      // add new Post     
      const post_pic = await uploadToImagur(req.body.picture)
      const values = [req.body.title, req.body.body, req.body.user_id, req.body.author,post_pic? post_pic.link : '',req.body.published,req.body.category]
      pool.query(`INSERT INTO
                  posts(title, body,user_id, author, date_created,picture,published,category)
                  VALUES($1, $2,$3, $4, NOW(),$5,$6,$7) RETURNING *`,
        values, (q_err, q_res) => {
            console.log('now we here');
            if (q_err) return res.status(500).send('failed');
            console.log('and here ');
            // console.log(q_err)
            const response = q_res.rows[0]
            delete response.search_vector
            delete response.date_created
            delete response.like_user_id
            delete response.likes
            return res.json(response)

      });
    }else{
      // edit post
      let post_pic = req.body.picture
      if (!post_pic.includes('imgur')){
        console.log('new pic ')
        post_pic = await uploadToImagur(req.body.picture)
        post_pic=post_pic.link
      }
      const values = [req.body.title, req.body.body, req.body.user_id, req.body.author,post_pic? post_pic : '',req.body.published,req.body.pid,req.body.category]
        pool.query(`UPDATE posts SET title= $1, body=$2, user_id=$3, author=$4,picture = $5,published = $6, date_created=NOW(), category=$8
                    WHERE pid = $7 RETURNING *`, values,
                    (q_err, q_res) => {
                      if (q_err) return res.status(500).send('failed');

                      const response = q_res.rows[0]
                      delete response.search_vector
                      delete response.date_created
                      delete response.like_user_id
                      delete response.likes
                      return res.json(response)

              })
    }

  }

})


// Like & dislike a post
router.put('/like', (req, res) => {
  const uid = [req.body.uid]
  const post_id = req.body.pid
  const liked = req.body.liked
  const values = [ uid, post_id,]
  if (!req.user ||req.user.uid != uid ) return res.status(400).send()
  if (!liked) {
    pool.query(`UPDATE posts
    SET like_user_id = like_user_id || $1, likes = likes + 1
    WHERE NOT (like_user_id @> $1)
    AND pid = ($2)`,
      values, (q_err, q_res) => {
      if (q_err) return res.status(500).send(q_err);
      res.json(q_res.rows);
      });
  }else{
    pool.query(`UPDATE posts
    SET like_user_id = array_remove(like_user_id, $1), likes = likes - 1
    WHERE pid = ($2)`,
      [req.body.uid,post_id], (q_err, q_res) => {
      if (q_err) return res.status(500).send(q_err);
      res.json(q_res.rows);
      });
  }

});

// Deelete post and its comments
router.delete('/deletePost', (req, res) => {
  if (!req.user || !req.user.author) return res.status(400).send() 

  const post_id = req.query.pid

  pool.query(`DELETE FROM comments
              WHERE post_id = $1`, [post_id],
              (q_err, q_res) => {
                  pool.query(`DELETE FROM posts WHERE pid = $1`, [ post_id ],
                    (q_err, q_res) => {
                      res.json(q_res.rows)
                      // console.log(q_err)
                  })
        })

})



module.exports = router