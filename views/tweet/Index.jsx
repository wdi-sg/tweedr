const React = require('react');
const Layout = require('../layout/Layout');

class Index extends React.Component {
  render() {
    let tweets;

    if (this.props.tweets) {
      tweets = this.props.tweets.map(tweet => {
        return (
          <div key={tweet.id} className="card">
            <div className="card-body">
              <h5 className="card-title">Username</h5>
              <h6 className="card-subtitle mb-2 text-muted">Date time</h6>
              <p className="card-text">{tweet.tweet}</p>
            </div>
          </div>
        );
      });
    } else {
      tweets = <p>No tweet</p>;
    }

    return (
      <Layout username={this.props.username}>
        <div className="container">
          {tweets}
        </div>
      </Layout>

    );
  }
}

module.exports = Index;
