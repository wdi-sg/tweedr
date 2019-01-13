var React = require("react");
var NavBar = require('../NavBar');

class LoggedIn extends React.Component {
  render() {

    return (
      <NavBar>
          <h1> You are already logged in. </h1>
          <h1> Log out to use or register another account. </h1>
      </NavBar>

    );
  }
}

module.exports = LoggedIn;