DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tweet;
DROP TABLE IF EXISTS users_tweet;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name text,
  password text
);

CREATE TABLE IF NOT EXISTS tweet (
  id serial PRIMARY KEY,
  user_id integer,
  content text
 );

CREATE TABLE IF NOT EXISTS users_tweet (
  id serial PRIMARY KEY,
  user_id integer,
  tweet_id integer
);

