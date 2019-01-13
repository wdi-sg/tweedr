CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    tweet TEXT,
    user_id integer REFERENCES users (id),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS follows (
    follower_id integer REFERENCES users (id),
    followee_id integer
);
