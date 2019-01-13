<<<<<<<<<<PROFILE>>>>>>>>>>
//register
let queryString = "INSERT INTO users (name, password, profile_url) VALUES ($1, $2, $3) RETURNING name";
let values = [name, password, profile_url];

//login
let queryString = "SELECT name, password FROM users WHERE name ="+userName;

//see user profile
let queryString = "SELECT * FROM users"


<<<<<<<<<<TWEETS>>>>>>>>>>
//post new tweet
let queryString = "INSERT INTO tweets (user_name, msg, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING id";
let values = [username, msg, photo_url];

let queryString = "UPDATE tweets SET tweet_parent = msg WHERE tweet_parent IS NULL";

//reply a tweet
let queryString = "INSERT INTO tweets (tweet_parent, user_name, msg, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING id";
let values = [tweet_parent, user_name, msg, photo_url];

//edit tweets
let queryString = "UPDATE tweets SET msg ="+msg+", photo_url="+photo_url+" WHERE id ="+id;

//delete tweets
let queryString = "DELETE from tweets WHERE id ="+id;

//see all tweets
let queryString = "SELECT * FROM tweets";


<<<<<<<<<<FOLLOW>>>>>>>>>>
//post follow
let queryString = "INSERT INTO follow (follower_name, following_name) VALUES ($1, $2) RETURNING id"
let values = [follower_name, following_name];

//delete follow
let queryString = "DELETE from follow WHERE follower_name ="+follower_name+" AND following_name ="+following_name;

//see all tweets based on following and followers
let queryString =

"SELECT follow.following_name AS name, tweets.id AS tweet_id, tweets.tweet_parent, tweets.msg, tweets.photo_url, tweets.created_dt FROM tweets INNER JOIN follow ON user_name = following_name WHERE follower_name ="+user_name+" UNION all SELECT user_name as name, id AS tweet_id, tweet_parent, msg, photo_url, created_dt FROM tweets WHERE user_name ="+user_name







