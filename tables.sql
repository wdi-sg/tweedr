CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
  id SERIAL PRIMARY KEY,
  tweet TEXT,
  author TEXT,
  time_created TIMESTAMP DEFAULT now()
);
