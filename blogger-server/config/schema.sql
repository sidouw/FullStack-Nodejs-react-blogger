CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  gid VARCHAR(255) UNIQUE,
  author varchar,
  username varchar(255),
  picture varchar(300),
  date_created TIMESTAMP
);


CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  picture VARCHAR,
  user_id INT REFERENCES users(uid),
  author VARCHAR ,
  date_created TIMESTAMP,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0,
  category VARCHAR (255),
  published BOOLEAN
);

CREATE TABLE comments (
  cid SERIAL PRIMARY KEY,
  comment VARCHAR(800),
  author VARCHAR (255),
  user_id INT REFERENCES users(uid),
  post_id INT REFERENCES posts(pid),
  date_created TIMESTAMP
);

