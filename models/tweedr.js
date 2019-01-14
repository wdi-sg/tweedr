/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

    let insertRegisterInfo = (name, password, profile_url, callback) => {
        const queryString = "INSERT INTO users (name, password, profile_url) VALUES ($1, $2, $3) RETURNING name";
        const values = [];
        values.push(name);
        values.push(password);
        values.push(profile_url);
        dbPoolInstance.query(queryString, values, (err, queryResult) => {
            callback(err, queryResult);
        });
    }


    let getUserLoginInfo =(user_name, callback) => {
        const queryString = "SELECT name, password FROM users WHERE name ='"+user_name+"'";
        dbPoolInstance.query(queryString, (err, queryResult) => {
            result = queryResult.rows;
            callback(err, result);
        });
    };


    let getProfileTweets = (user_name, callback) => {
        const queryString1 = "SELECT * FROM users WHERE name ='"+user_name+"'";
        const queryString2 = "SELECT * FROM (SELECT follow.following_name AS name, tweets.id AS tweet_id, tweets.tweet_parent, tweets.msg, tweets.photo_url, tweets.created_dt FROM tweets INNER JOIN follow ON tweets.user_name = follow.following_name WHERE follow.follower_name ='"+user_name+"' UNION all SELECT user_name as name, id AS tweet_id, tweet_parent, msg, photo_url, created_dt FROM tweets WHERE user_name ='"+user_name+"') a ORDER BY a.created_dt DESC";
        dbPoolInstance.query(queryString1, (err1, queryResult1) => {
            if (err1) {
                callback(err1, null);
            } else {
                dbPoolInstance.query(queryString2, (err2, queryResult2) => {
                    if (err2) {
                        callback(err2, null);
                    } else {
                        result = {};
                        result.user_profile = queryResult1.rows;
                        result.tweets = queryResult2.rows;
                        callback(null, result);
                    }
                })
            }
        });
    }


    let insertTweet = (user_name, msg, photo_url, callback) => {
        const queryString1 = "INSERT INTO tweets (user_name, msg, photo_url) VALUES ($1, $2, $3) RETURNING id";
        let values1 = [];
        values1.push(user_name);
        values1.push(msg);
        values1.push(photo_url);
        dbPoolInstance.query(queryString1, values1, (err1, queryResult1) => {
            if (err1) {
                console.log('query err', err1.message);
            } else {
                dbPoolInstance.query("UPDATE tweets SET tweet_parent = msg WHERE tweet_parent IS NULL", (err2, queryResult2) => {
                    if (err2) {
                        console.log('query err', err2.message);
                    } else {
                        let result = queryResult1.rows;
                        callback(err1, result);
                    }
                });
            }
        });
    };


    let getAllTweets = (callback) => {
        const queryString = "SELECT * FROM tweets ORDER BY created_dt DESC";
        dbPoolInstance.query(queryString, (err, queryResult) => {
            let results = {'tweets': queryResult.rows}
            callback(err, results);
        });
    }


    return {
        insertRegisterInfo,
        getUserLoginInfo,
        getProfileTweets,
        insertTweet,
        getAllTweets
    };

};