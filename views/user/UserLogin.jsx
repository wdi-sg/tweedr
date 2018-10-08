var React = require("react");

class UserLogin extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users/loggedin">
            <div className="user-attribute">
              Login<input name="name" type="text" />
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

module.exports = UserLogin;
