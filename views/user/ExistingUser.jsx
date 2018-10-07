var React = require("react");

class ExistingUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>Login</h1>
        <h2>Login to view your tweeds!</h2>
          <form className="user-form" method="POST" action="/users/account">
            <div className="user-attribute">
              Username<input name="name" type="text" />
            </div>
            <div className="user-attribute">
              Password:<input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ExistingUser;
