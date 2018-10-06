-- DROP TABLE IF EXISTS users;

-- CREATE TABLE IF NOT EXISTS users (

-- 	id SERIAL PRIMARY KEY,
-- 	username TEXT,
-- 	password TEXT,
-- 	age INTEGER,
-- 	description TEXT

-- );

DROP TABLE IF EXISTS follow;

CREATE TABLE IF NOT EXISTS follow (

	id SERIAL PRIMARY KEY,
	username_id INTEGER,
	follower INTEGER

);

DROP TABLE IF EXISTS tweet;

CREATE TABLE IF NOT EXISTS tweet (

	id SERIAL PRIMARY KEY,
	title TEXT,
	message TEXT,
	user_id INTEGER,
	dateandtime TEXT

);