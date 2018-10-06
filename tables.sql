CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
    hashedPassword TEXT
);


CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER
);

CREATE TABLE IF NOT EXISTS followers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    follower_user_id INTEGER
);

