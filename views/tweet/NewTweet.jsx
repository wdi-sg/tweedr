const React = require("react");

class NewTweet extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/tweets">
            <div>
              <input
                name="tweet"
                type="text"
                placeholder="What's happening?"
                required
              />
            </div>
            <input type="submit" value="Tweet" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewTweet;
