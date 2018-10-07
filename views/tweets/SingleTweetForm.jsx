import React from "react";
const Header = require("../layout/Header");
const moment = require("moment");

class ShowSingleTweet extends React.Component {
  render() {
    const tweetInfo = this.props.tweets.rows[0];
    return (
      <html>
        <Header cookies={this.props.cookies} />
        <p>Show Tweet</p>
        <p>Tweet ID : {tweetInfo.tweet_id}</p>
        <p>Content : {tweetInfo.content}</p>
        <p>Author : {tweetInfo.user_id}</p>
        <p>
          Posted at : {moment(tweetInfo.created_at).format("YYYY-MM-DD HH:mm")}
        </p>
      </html>
    );
  }
}

module.exports = ShowSingleTweet;
