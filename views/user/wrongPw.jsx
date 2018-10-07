var React = require("react");

class Login extends React.Component {
  render() {

    console.log("RELOGIN PROPS", this.props);

    return (
      <html>
        <head />
        <body>
          <h1>Wrong password!</h1>
          <p>Please try again: </p>
          <form method="POST" action="/users/account">
            <div>
              Username:<input name="name" type="text" />
            </div>
            <div>
              Password:<input name="password" type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;