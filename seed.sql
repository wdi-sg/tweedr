INSERT INTO users (firstname, lastname, username, password, email) VALUES ('Cash', 'Teo', 'kingcashthefifth', '12345678', 'kingcashthefifth@gmail.com');
INSERT INTO users (firstname, lastname, username, password, email) VALUES ('Zuei', 'Tam', 'zueilababy', '12345678', 'zueilababy@gmail.com');
INSERT INTO users (firstname, lastname, username, password, email) VALUES ('Beboo', 'Teo', 'princebeboo', '12345678', 'princebeboo@gmail.com');
INSERT INTO users (firstname, lastname, username, password, email) VALUES ('David', 'Ng', 'davidng', '12345678', 'davidng@gmail.com');
INSERT INTO users (firstname, lastname, username, password, email) VALUES ('Teng', 'Teng', 'tengtengteng', '12345678', 'tengtengteng@gmail.com');



INSERT INTO tweets (tweet, user_id) VALUES ('Hi is anybody there?', 1);
INSERT INTO tweets (tweet, user_id) VALUES ('Passion for code still burning strong!', 1);
INSERT INTO tweets (tweet, user_id) VALUES ('I don''t understand what''s so great about programming', 2);
INSERT INTO tweets (tweet, user_id) VALUES ('I hate using the computer!', 2);
INSERT INTO tweets (tweet, user_id) VALUES ('Shopping is my passion', 2);
INSERT INTO tweets (tweet, user_id) VALUES ('I love IU', 3);
INSERT INTO tweets (tweet, user_id) VALUES ('I hope I get a snack from my master today!', 3);
INSERT INTO tweets (tweet, user_id) VALUES ('Bark Bark Bark!', 3);
INSERT INTO tweets (tweet, user_id) VALUES ('Woof! Woof!', 3);



INSERT INTO follows (user_id, following_id) VALUES (1, 2);
INSERT INTO follows (user_id, following_id) VALUES (1, 3);
INSERT INTO follows (user_id, following_id) VALUES (1, 4);
INSERT INTO follows (user_id, following_id) VALUES (1, 5);
INSERT INTO follows (user_id, following_id) VALUES (2, 1);
INSERT INTO follows (user_id, following_id) VALUES (2, 3);
INSERT INTO follows (user_id, following_id) VALUES (2, 4);
INSERT INTO follows (user_id, following_id) VALUES (3, 1);
INSERT INTO follows (user_id, following_id) VALUES (3, 2);
INSERT INTO follows (user_id, following_id) VALUES (5, 1);
INSERT INTO follows (user_id, following_id) VALUES (1, 4);
INSERT INTO follows (user_id, following_id) VALUES (4, 1);
INSERT INTO follows (user_id, following_id) VALUES (4, 2);