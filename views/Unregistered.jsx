var React = require("react");
var NavBar = require('./NavBar');

class Home extends React.Component {
  render() {

    return (
      <NavBar>
          <h1>Welcome to Tweedr</h1>
          <p>Please login to tweet or read tweets.</p>
          <form className="user-form col-6 mb-3" method="POST" action="/logging">
            <div className="form-group user-attribute">
              <label htmlFor="inputUsername">Username</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Enter your username"/>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password"/>
            </div>
            <button name="submit" type="submit" className="btn btn-primary">Login</button>
          </form>
          <p>If not, you can <a href="/user/new">register</a>.</p>
      </NavBar>
    );
  }
}

module.exports = Home;