var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>User Login</h1>
          <form className="user-form" method="POST" action="/login">
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

module.exports = Login;
