var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1> Welcome to Tweedr. PLEASE REGISTER! </h1>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              Username<br/><input name="username" type="text" />
            </div>
            <div className="user-attribute">
              Password:<br/><input name="password" type="password" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;