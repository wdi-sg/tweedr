INSERT INTO users (name, password) VALUES ('Jason', 'e888ace9c427b14fcfa6c335967c90d82133edfcf47791bac3f2402eed29a944');
INSERT INTO users (name, password) VALUES ('Jolly', '505851ab1c4e6450b36866479072b74dc122ffdd24b143a5edfb3854a9d944e3');
INSERT INTO users (name, password) VALUES ('Josh', 'cdb2f1695ec29be77f154e490d093e512cff27f2c48ad389433fc384af9bf8cd');
INSERT INTO users (name, password) VALUES ('Jobs', '93c5736b4a59e16d8fd6f55be9c5a3d6bafbeb01bf566edc975f0665694a93e2');

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