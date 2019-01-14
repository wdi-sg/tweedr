var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <h3>Register as a new user:</h3>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              Username:<input name="username" type="text" />
            </div>
            <div className="user-attribute">
              Password:<input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>

          <button><a href="/">Back to Home</a></button>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
