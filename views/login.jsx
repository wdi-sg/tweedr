var React = require("react");
// this form creates a new user account and sends to the Database
class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1> Tweedr Login Page </h1>
          <form className="login-form" method="POST" action="/users">
            <div className="user-attribute">
              User name<input name="name" type="text" placeholder="Enter User Name here" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" placeholder="Password Here" />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;