var React = require("react");

class Profile extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="tweet-form" method="POST" action="http://localhost:3000/user/tweet">
            <div className="tweet-attribute">
              tweet<input name="tweet" type="text" />
            </div>
            <input name="submit" type="submit" value="tweet" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;
