var React = require("react");

class NewTweet extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/tweets">
            <div className="user-attribute">
              ID:<input name="userid" type="text" value={this.props.user_id}/>
            </div>
            <div className="user-attribute">
              tweet:<input name="tweet" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewTweet
