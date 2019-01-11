CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
);

CREATE TABLE tweets (
    id SERIAL PRIMARY KEY,
    tweet TEXT,
    user_id INTEGER
);
