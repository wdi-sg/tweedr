CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    content TEXT,
    author_id INTEGER,
    tweeted_on TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users_followers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    follower_id INTEGER
);

-- psql -d tweedr -U postgres -f tables.sql


-- Queries

-- Find followers of a certain user
-- SELECT * FROM users INNER JOIN users_followers ON (users_followers.follower_id = users.id) WHERE users_followers.user_id = 3;
