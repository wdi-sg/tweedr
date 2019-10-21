var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h2>Welcome to Tweedr</h2>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              name<input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" />
            </div>
            <input name="submit" id="newusercre8" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
