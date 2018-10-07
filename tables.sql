CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password CHAR(64)
);

CREATE TABLE IF NOT EXISTS tweets (
	id SERIAL PRIMARY KEY,
	title TEXT,
	content TEXT,
	date_posted DATE DEFAULT now(),
  user_id INTEGER
);


CREATE TABLE IF NOT EXISTS comments (
	id SERIAL PRIMARY KEY,
	content TEXT,
	date_posted DATE DEFAULT now(),
	user_id INTEGER,
	tweet_id INTEGER
);


CREATE TABLE IF NOT EXISTS users_tweets (
	id SERIAL PRIMARY KEY,
	user_id INTEGER
);