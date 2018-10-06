var React = require("react");

class showTweets extends React.Component {
  render() {
    console.log(this.props.tweets);
    const tweets = this.props.tweets.rows;
    const mapTweets = tweets.map(tweet => {
      return (
        <div>
          <li key={tweet.tweet_id}>
            Tweet ID : {tweet.tweet_id} Content : {tweet.content} Posted By : <a href={"/users/" + tweet.user_id + "/show"}> User ID {tweet.user_id}</a>
          </li>
        </div>
      );
    });
    return (
      <html>
        <head />
        <body>{mapTweets}</body>
      </html>
    );
  }
}

module.exports = showTweets;
