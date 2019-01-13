var React = require("react");
// this form creates a new user account and sends to the Database
class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h1> Create New User Page </h1>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              name<input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" /> <br />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
