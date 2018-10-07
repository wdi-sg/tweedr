var React = require("react");
var DefaultLayout = require('../layout/Default');

class TweetBox extends React.Component {
  render() {
    return (
        <DefaultLayout title="create tweets">
          <form className="tweet-box" method="POST" action="/tweets">
            <h1>Insert your tweet</h1>
            <br/>
            <div className="tweet-box">
              Tweet: <input name="tweet" type="text" />
            </div>
            <br/>
            <input name="submit" type="submit" />
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = TweetBox;
