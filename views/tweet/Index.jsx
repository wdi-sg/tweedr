const React = require('react');
const Layout = require('../layout/Layout');
const NewTweet = require('./NewTweet');

class Index extends React.Component {
  render() {
    let newTweet;
    let tweets;

    if (this.props.tweets && this.props.username) {
      newTweet = <NewTweet />;

      tweets = this.props.tweets.map(tweet => {
        const date = tweet.time_created.getDate();
        const month = tweet.time_created.getMonth();
        const year = tweet.time_created.getFullYear();
        const hours = tweet.time_created.getHours();
        const minutes = tweet.time_created.getMinutes();
        const seconds = tweet.time_created.getSeconds();
        const time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

        return (
          <div key={tweet.id} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{tweet.author}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{time}</h6>
              <p className="card-text">{tweet.tweet}</p>
            </div>
          </div>
        );
      });
    }

    return (
      <Layout username={this.props.username}>
        {newTweet}
        <div className="container my-5">
          {tweets}
        </div>
      </Layout>

    );
  }
}

module.exports = Index;
