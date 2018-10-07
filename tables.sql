DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT
);

DROP TABLE IF EXISTS tweets;

CREATE TABLE IF NOT EXISTS tweets (
	tweet_id SERIAL PRIMARY KEY,
	tweetMessage TEXT,
	user_id INTEGER
);

