DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password VARCHAR (200) NOT NULL
);

DROP TABLE IF EXISTS tweeds;

CREATE TABLE IF NOT EXISTS tweeds
(
    id SERIAL PRIMARY KEY,
    tweed TEXT NOT NULL,
    -- date_created DATE DEFAULT current_timestamp,
    user_id INTEGER
    -- user_name TEXT NOT NULL
);

DROP TABLE IF EXISTS followers;

CREATE TABLE IF NOT EXISTS followers
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    follower_user_id INTEGER
);