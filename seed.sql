
INSERT INTO users (name, password) VALUES('Elon Musk','visionary');
INSERT INTO users (name, password) VALUES('Donald Trump','clown');
INSERT INTO users (name, password) VALUES('Straits Time','news');


INSERT INTO tweet (user_id,content) VALUES (1,'SpaceX has signed the world first private passenger to fly around the Moon aboard our BFR launch vehicle—an important step toward enabling access for everyday people who dream of traveling to space.');
INSERT INTO tweet (user_id,content) VALUES (1,'Yusaku will be bringing 8 brave artists & cultural figures with him on the journey around the moon!');
INSERT INTO tweet (user_id,content) VALUES (1,'People sometimes forget that a company is just a group of people gathered together to make products. So long as it makes great products, it will have great value.');

INSERT INTO tweet (user_id,content) VALUES (2,'You don’t hand matches to an arsonist, and you don’t give power to an angry left-wing mob. Democrats have become too EXTREME and TOO DANGEROUS to govern. Republicans believe in the rule of law - not the rule of the mob. VOTE REPUBLICAN');
INSERT INTO tweet (user_id,content) VALUES (2,'Our country’s great First Lady, Melania, is doing really well in Africa. The people love her, and she loves them! It is a beautiful thing to see.');
INSERT INTO tweet (user_id,content) VALUES (2,'America will always be a nation of great builders, because in America, we honor work, we honor grit, we honor craftsmanship, we honor the men and women who turn dreams into a reality with their own two beautiful hands.');

INSERT INTO tweet (user_id,content) VALUES (3,'Japan, Okinawa southernmost prefecture and also its poorest, made history last Sunday when it elected the country first hafu (biracial) governor. Meet Denny Tamaki.');
INSERT INTO tweet (user_id,content) VALUES (3,'Banksy painting destroyed in artist prank at Sotheby auction');
INSERT INTO tweet (user_id,content) VALUES (3,'Tokyo Tsukiji fish market to move, but will return after 5 years');


INSERT INTO users_tweet (user_id, tweet_id) VALUES (1,1);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (1,2);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (1,3);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (2,4);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (2,5);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (2,6);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (3,7);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (3,8);
INSERT INTO users_tweet (user_id, tweet_id) VALUES (3,9);
