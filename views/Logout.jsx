var React = require("react");
var NavBar = require('./NavBar');

class Logout extends React.Component {
  render() {

    return (
      <NavBar>
          <h1> You are logged out. See you soon. </h1>
      </NavBar>

    );
  }
}

module.exports = Logout;