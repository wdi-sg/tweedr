CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name TEXT,
		password TEXT
);

CREATE TABLE IF NOT EXISTS tweets (
		id SERIAL PRIMARY KEY,
		cookie_id INTEGER,
		message TEXT
);