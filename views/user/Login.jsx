var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users/authentication">
              username:<input name="name" type="text" />
              password:<input name="password" type="text" />
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;