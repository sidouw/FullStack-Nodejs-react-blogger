const express = require('express')
const router = express.Router()
const pool = require('../config/db')


// add comment to db
router.post('/savecomment', (req, res) => {
    const values = [ req.body.comment, req.body.user_id, req.body.author, req.body.post_id]

    if (!req.user || req.user.uid != req.body.user_id) return res.status(400).send()

    pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
        })
  })
  
// delete comment 
router.delete('/deletecomment', (req, res) => {
    const cid = req.query.cid
    const uid = req.query.uid
    if (!req.user || req.user.uid !== uid) return res.status(400).send()
    // console.log(req)

    pool.query(`DELETE FROM comments
                WHERE cid=$1`, [ cid ],
                (q_err, q_res ) => {
                    res.json(q_res)
        })
  })
  
// Get comments
router.get('/postcomments', (req, res) => {
    const post_id = req.query.pid
    // console.log(post_id)
    pool.query(`SELECT * FROM comments
                WHERE post_id=$1`, [ post_id ],
                (q_err, q_res ) => {
                  // console.log(q_res)
                    res.json(q_res.rows)
        })
  })

  module.exports = router