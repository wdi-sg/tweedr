var React = require("react");
var DefaultLayout = require('../layout/Default');

class Home extends React.Component {
  render() {
    return (
      <DefaultLayout title="Welcome to your Tweedr profile">

        <div className="home">
          <h1>Welcome to Tweedr</h1>
          <h2>What ya thinking?</h2>
        </div>

        <form className="tweet-form" method="POST" action="/users/home">
          <textarea id="tweetMsg" name="tweetMsg" type="text" />
          {/* <button id="tweetBtn">Submit</button> */}
          <input id="tweetBtn" type="submit" value="Submit" />
        </form>

        <form className="tweet-collections" method="POST" action="/users">
          <textarea id="tweetMsg" name="tweetMsg" type="text" />
          {/* <button id="tweetBtn">Submit</button> */}
          <input id="tweetBtn" type="submit" value="Submit" />
        </form>

       </DefaultLayout>
    );
  }
}

module.exports = Home;
