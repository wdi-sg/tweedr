var React = require("react");
const moment = require("moment");

class showTweets extends React.Component {
  render() {
    console.log(this.props.tweets);
    const tweets = this.props.tweets.rows;
    const mapTweets = tweets.map(tweet => {
      return (
        <div>
          <li key={tweet.tweet_id}>
            <a href={"/tweets/" + tweet.tweet_id + "/show"}>
              Tweet ID : {tweet.tweet_id}
            </a>{" "}
            Content : {tweet.content} Posted By :{" "}
            <a href={"/users/" + tweet.user_id + "/show"}>
              {" "}
              User ID {tweet.user_id}
            </a>{" "}
            Posted At : {
  moment(tweet.created_at).format("YYYY-MM-DD HH:mm");
}

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
