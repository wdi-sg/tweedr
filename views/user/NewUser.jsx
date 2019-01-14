var React = require("react");
var Default = require('./default')


class NewUser extends React.Component {
  render() {
    return (
      <Default>
      <form className="user-form" method="POST" action="/users">
        <div className="user-attribute">
          name<input name="name" type="text" />
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
