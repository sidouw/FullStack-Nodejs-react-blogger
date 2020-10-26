require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const helmet = require("helmet");

const cors = require('cors')
const passport = require('passport')
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

require('./config/passport-setup')
const app = express();

const port = process.env.PORT 




app.use(helmet());
// app.use(logger('dev'));
app.use(cors())
app.use(express.json({ limit: '20MB' }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000 * 7,
  keys: ['somethingthatssupposedtobeasecret']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);



app.listen(port,()=>{
  console.log('server Started at http://localhost:'+port);
})
