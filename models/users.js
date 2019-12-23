module.exports = (dbPoolInstance) => {

let newUsers = (callback) => {
    let hashedPassword = sha256(request.body.password + SALT);
    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';

    const values = [
        request.body.username,
        hashedPassword,
    ];

    dbPoolInstance.query(query, (err, result) => {
        if (err) {
            callback(err,null);
        }
    })
}


let getLogIn = (callback) => {

    let requestUsername = request.body.username;
    let requestPassword = request.body.password;

    const queryString = "SELECT * FROM users WHERE username= '"+requestUsername+"'";

    dbPoolInstance.query(query, (err, result) => {
      if( err ){

        // invoke callback function with results after query has executed
        callback(err, null);

      }else{

        // invoke callback function with results after query has executed

        if( result.rows.length > 0 ){
          callback('query result: ', result.rows);


        }else{
          callback(null, null);

        }
      }
    });

  };



  let newTweets = (callback) => {
    const newTweet = 'INSERT INTO tweets (content) VALUES ($1)';
    let values = [request.body.tweets];
    let tweets = [];

    dbPoolInstance.query(newTweet, values, (err, result) => {
        for (let i = 0; i < result.rows.length; i++){
            tweets.push(result.rows[i]);
        }
    })
  }

  return {
    getLogIn: getLogIn,
    newTweets: newTweets,
    newUsers: newUsers
  };
}