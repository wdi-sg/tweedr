var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="tweet-form" method="POST" action="/tweets">
            <div className="tweet-attribute">
            content<input name="content" type="text" />
            </div>
            <div className="tweet-attribute">
            created_at<input name="created_at" type="text" />
            </div>
            <div className="tweet-attribute">
            users_id<input name="created_at" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
