var React = require("react");

class LoginPage extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="login" method="POST" action="/user/login">
            <div className="user-attribute">
              name<input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = LoginPage;