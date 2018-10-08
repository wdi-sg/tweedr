var React = require("react");

class NewTweet extends React.Component {

  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users/alltweets">
            <div className="user-attribute">
              Tweed Something<input name="tweet" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewTweet;
