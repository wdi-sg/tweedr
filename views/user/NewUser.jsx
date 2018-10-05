var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users">
            <h1>New User - Registration</h1>
            <div className="user-attribute">
              Name: <input name="name" type="text" />
            </div>
            <br/>
            <div className="user-attribute">
              Password: <input name="password" type="text" />
            </div>
            <br/>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
