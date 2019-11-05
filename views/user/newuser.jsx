var React = require("react");
var Default = require("../default");

class NewUser extends React.Component {
  render() {
    return (
      <Default>
        <h2>New User</h2>
        <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              name<input name="username" type="text" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
      </Default>
    );
  }
}

module.exports = NewUser;
