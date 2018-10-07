CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
username text,
password text
);


CREATE TABLE IF NOT EXISTS tweets(
id SERIAL PRIMARY KEY,
username text,
tweet text
);