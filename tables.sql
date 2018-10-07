DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS followers;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(15),
	password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
	id SERIAL PRIMARY KEY,
	content TEXT,
	user_id INTEGER,
	created_at timestamptz
);


-- user_id is the id of user from users who is following the user with a user.id of follower_id from the table users
CREATE TABLE IF NOT EXISTS followers (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	follower_id INTEGER
);

