var React = require("react");
const ShowTweets = require('./tweets/ShowTweets.jsx')
const sha256 = require('js-sha256');
// Salt for Hash
const SALT = "aKiRa is a PokeMON";

class Index extends React.Component {
  render() {
      const checkSessionCookieHash = sha256(this.props.cookies.user_id + 'logged_id' + SALT)
// Initializing a variable to track whether User is logged in or not.
// The variable can then be used in a Ternary to render login/logout button.
      let isLoggedIn = false;
      if (this.props.cookies.loggedIn === checkSessionCookieHash) {
          isLoggedIn=true
      }
    return (
      <html>
        <head />
        <body>
          <div>Welcome to Tweeder</div>
          <ShowTweets tweets = {this.props.tweets} />
          <div>
            <span>
              <a href="/users/new">Create a new user</a>
            </span>
          </div>
          <div>
            <span>
                {isLoggedIn ? (<a href="/users/logout">Log Out</a>) : (<a href="/users/login">Log In</a>)}
            </span>
          </div>
          <div>
            <span>
              <a href="/tweets/new">Create a New Tweet</a>
            </span>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;
