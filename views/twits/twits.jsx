var React = require("react");

class IndexPage extends React.Component {
  render() {

    console.log(this.props.tweets);
    return (
      <html>
        <body>
          <h1>List of tweets</h1>

            <form className="twit-form" method="POST" action="/index/twits">

            <div className="user-attribute">
              create twit<input name="twit" type="text" />

              create user_id<input name="user_id" type="text" />
              <input name="submit" type="submit" />
            </div>
            </form>

          <ul>
          <li></li>
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = IndexPage;