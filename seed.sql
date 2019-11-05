CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE tweeds (
    id SERIAL PRIMARY KEY,
    tweed TEXT,
    user_id INTEGER
);

INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO users (username, password) VALUES ('shan', 'abc123');