var React = require("react");

class TweetBox extends React.Component {
  render() {
        console.log("this.props is: ", this.props.tweets);
        const tweetContents = this.props.tweets.map(tweet => {
            return <li>{tweet.content}</li>
        })
    return (
      <html>
        <head />
        <body>
            <h1>Displaying all tweets!</h1>
            <ol>
                {tweetContents}
            </ol>
        </body>
      </html>
    );
  }
}

module.exports = TweetBox;
