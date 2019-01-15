CREATE TABLE IF NOT EXISTS usersInfo (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    userTweet TEXT,
    usersInfo_id INTEGER,
    name TEXT
);

