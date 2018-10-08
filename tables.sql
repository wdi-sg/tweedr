CREATE TABLE IF NOT EXISTS users(
	id serial PRIMARY KEY,
	name VARCHAR(30),
	password VARCHAR
);

CREATE TABLE IF NOT EXISTS tweets(
	id serial PRIMARY KEY,
	user_id INTEGER,
	tweet_id INTEGER,
	-- content TEXT
);