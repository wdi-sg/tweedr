const React = require('react');
const Layout = require('../layout/Layout');
const Tweets = require('../tweet/Tweets');

class Show extends React.Component {
  render() {
    return (
      <Layout username={this.props.username}>
        <div className="row">
          <div className="col-md-4">
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title">
                  {this.props.user.name}
                </h5>
                <p className="card-text">
                  {this.props.user.bio}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <Tweets
              username={this.props.username}
              tweets={this.props.tweets}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Show;
