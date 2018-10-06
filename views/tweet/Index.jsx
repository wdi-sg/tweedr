const React = require('react');
const Layout = require('../layout/Layout');
const NewTweet = require('./NewTweet');
const Tweets = require('./Tweets');

class Index extends React.Component {
  render() {
    let newTweet;
    let feed;

    if (this.props.username) {
      newTweet = <NewTweet />;
      feed = (
        <Tweets username={this.props.username} tweets={this.props.tweets} />
      );
    }

    return (
      <Layout username={this.props.username}>
        {newTweet}
        {feed}
      </Layout>

    );
  }
}

module.exports = Index;
