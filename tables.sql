CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(25),
  lastname VARCHAR(25),
  username VARCHAR(25),
  password VARCHAR(25),
  email VARCHAR(50),
  propic VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS tweets (
  id SERIAL PRIMARY KEY,
  tweet VARCHAR(150),
  tweetpic VARCHAR(200),
  tweetvid VARCHAR(200),
  tweettime TIMESTAMP DEFAULT now(),
  user_id INTEGER
);

CREATE TABLE IF NOT EXISTS follows (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  following_id INTEGER
);

