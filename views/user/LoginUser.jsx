var React = require("react");

class LoginUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users/login">
            <div className="user-attribute">
              Name<input name="name" type="text" />
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

module.exports = LoginUser;
