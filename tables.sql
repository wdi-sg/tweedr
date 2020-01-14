CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
    display TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    tweet TEXT,
    users_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS usersjointweets (
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    tweets_id INTEGER
);

CREATE TABLE IF NOT EXISTS usersfollowusers (
    id SERIAL PRIMARY KEY,
    users_id INTEGER,
    follow_id INTEGER,
    followed_at TIMESTAMPTZ DEFAULT now()
)