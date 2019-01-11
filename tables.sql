CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT,
    username TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    content TEXT,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id)
);