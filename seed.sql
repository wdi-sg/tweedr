INSERT INTO users (name, password, profile_url)
VALUES ('PizzaCat', 'password123', 'https://i.imgflip.com/77km4.jpg');

INSERT INTO users (name, password, profile_url)
VALUES ('Elsa', 'passABC', 'https://upload.wikimedia.org/wikipedia/en/5/5e/Elsa_from_Disney%27s_Frozen.png');



INSERT INTO tweets (user_name, msg, photo_url)
VALUES ('PizzaCat', 'Meow', 'http://cravingcatnip.com/wp-content/uploads/2017/04/kitten-teddy-bear-2.png');

INSERT INTO tweets (user_name, msg)
VALUES ('Elsa', 'Let it go!');

UPDATE tweets SET tweet_parent = msg WHERE tweet_parent IS NULL;



INSERT INTO follow (follower_name, following_name)
VALUES ('Elsa', 'PizzaCat');



