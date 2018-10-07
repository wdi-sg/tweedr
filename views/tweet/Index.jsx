var React = require("react");
var DefaultLayout = require('../layout/Default');

class TweetBox extends React.Component {
  render() {
        console.log("this.props is: ", this.props.tweets);
        const tweetContents = this.props.tweets.map(tweet => {
            return <li>{tweet.content}</li>
        })
    return (
        <DefaultLayout>
            <h1>Displaying all tweets!</h1>
            <ol>
                {tweetContents}
            </ol>
        </DefaultLayout>
    );
  }
}

module.exports = TweetBox;
