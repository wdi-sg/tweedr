
	CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  photo_url TEXT,
  username TEXT,
  password TEXT
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author_id INTEGER
);