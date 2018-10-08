CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password VARCHAR
);

CREATE TABLE IF NOT EXISTS tweeds (
	id SERIAL PRIMARY KEY,
	content TEXT,
	created TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS followers (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	follower_id INTEGER
);