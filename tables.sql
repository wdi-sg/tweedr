CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    profile_url TEXT,
    join_dt TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    tweet_parent TEXT,
    user_name TEXT NOT NULL,
    msg TEXT NOT NULL,
    photo_url TEXT,
    created_dt TIMESTAMP DEFAULT now()
);


CREATE TABLE IF NOT EXISTS follow (
    follower_name TEXT,
    following_name TEXT,
    follow_dt TIMESTAMP DEFAULT now(),
    PRIMARY KEY (follower_name, following_name)
);