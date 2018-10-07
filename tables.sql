DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS followers;

CREATE TABLE IF NOT EXISTS users(
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	password VARCHAR
);

CREATE TABLE IF NOT EXISTS tweets(
	tweet_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id),
	content TEXT,
	created_at timestamptz,
);

CREATE TABLE IF NOT EXISTS followers(
	followers_entry_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id),
	follower_user_id INTEGER REFERENCES users(user_id)
)
