CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    userid TEXT,
    passwrd TEXT
);
CREATE TABLE IF NOT EXISTS post (
    id SERIAL PRIMARY KEY, 
    user_serial INT,
    post_content TEXT
);