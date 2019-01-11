INSERT INTO users (name, password) VALUES ('Jason', 'Nosaj');
INSERT INTO users (name, password) VALUES ('Jolly', 'Ylloj');
INSERT INTO users (name, password) VALUES ('Josh', 'Hsoj');
INSERT INTO users (name, password) VALUES ('Jobs', 'Sboj');

INSERT INTO tweets (content, author_id) VALUES ('Hungry Sia', 2);
INSERT INTO tweets (content, author_id) VALUES ('I wanna go home', 1);
INSERT INTO tweets (content, author_id) VALUES ('Josh Rocks', 3);
INSERT INTO tweets (content, author_id) VALUES ('King of the world', 3);
INSERT INTO tweets (content, author_id) VALUES ('Bring me back to life', 4);
INSERT INTO tweets (content, author_id) VALUES ('Cook is killing Apple', 4);

INSERT INTO users_followers (user_id, follower_id) VALUES (4, 3);
INSERT INTO users_followers (user_id, follower_id) VALUES (4, 2);
INSERT INTO users_followers (user_id, follower_id) VALUES (4, 1);
INSERT INTO users_followers (user_id, follower_id) VALUES (3, 4);
INSERT INTO users_followers (user_id, follower_id) VALUES (2, 3);
INSERT INTO users_followers (user_id, follower_id) VALUES (2, 1);
INSERT INTO users_followers (user_id, follower_id) VALUES (1, 2);
INSERT INTO users_followers (user_id, follower_id) VALUES (1, 4);