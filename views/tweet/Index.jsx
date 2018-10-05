const React = require('react');

class Index extends React.Component {
  render() {
    const tweets = this.props.tweets.map(tweet => {
      return (
        <div key={tweet.id}>
          <p>{tweet.tweet}</p>
        </div>
      );
    });

    return (
      <div>
        {tweets}
      </div>
    );
  }
}

module.exports = Index;
