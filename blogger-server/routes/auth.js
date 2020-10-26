var express = require('express');
var router = express.Router();
const passport = require('passport')


const isAuth = (req,res,next)=>{
  if(req.user ){
    // console.log(req.user+'SPI Mat')
    return res.redirect('/')
  }else{
    next()
  }
}
// auth login
router.get('/login',isAuth,passport.authenticate('google',{
  scope:['profile']
}));
// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// redirect to main 
router.get('/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect('/')
})

module.exports = router;
