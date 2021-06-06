var React = require("react");
var NavBar = require('../NavBar');

class NewUser extends React.Component {
  render() {
    return (
      <NavBar>
        <form className="user-form col-6" method="POST" action="/user/registered">
          <div className="form-group user-attribute">
            <label htmlFor="inputUsername">Username</label>
            <input type="text" className="form-control" name="name" id="name" placeholder="Enter desired username"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" name="password" id="password" placeholder="Enter desired password"/>
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Register</button>
        </form>
      </NavBar>
    );
  }
}

module.exports = NewUser;
