CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (20),
    password VARCHAR (15)
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    content TEXT,
    time TIMESTAMP,
    user_id INTEGER REFERENCES users (id)
)