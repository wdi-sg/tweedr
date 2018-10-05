const React = require('react');
const Layout = require('../layout/Layout');

class Index extends React.Component {
  render() {
    const tweets = this.props.tweets.map(tweet => {
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

    return (
      <Layout>
        <div className="container">
          {tweets}
        </div>
      </Layout>

    );
  }
}

module.exports = Index;
