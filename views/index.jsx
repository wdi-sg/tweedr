var React = require("react");
const ShowTweets = require("./tweets/ShowTweets.jsx");
const Header = require("./layout/Header.jsx");
class Index extends React.Component {
  render() {
    return (
      <html>
        <head />
        <Header cookies={this.props.cookies} />
        <body>
          <div>Welcome to Tweeder</div>
          <ShowTweets tweets={this.props.tweets} />
        </body>
      </html>
    );
  }
}

module.exports = Index;
