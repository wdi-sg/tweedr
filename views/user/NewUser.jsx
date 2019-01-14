var React = require("react");
var Default = require("../Default");

class NewUser extends React.Component {
  render() {
    return (
      <Default>
        <h2>Create a New Account</h2><br/>
        <form className="user-form" method="POST" action="/users">
          <div className="user-attribute">
            Username: <input name="name" type="text" />
          </div>
          <div className="user-attribute">
            Password: <input name="password" type="password"/>
          </div>
          <input name="submit" type="submit" />
        </form>
      </Default>
    );
  }
}

module.exports = NewUser;
