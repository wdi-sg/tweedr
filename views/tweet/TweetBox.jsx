var React = require("react");

class TweetBox extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="tweet-box" method="POST" action="/tweets">
            <h1>Insert your tweet</h1>
            <br/>
            <div className="tweet-box">
              Tweet: <input name="tweet" type="text" />
            </div>
            <br/>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = TweetBox;
