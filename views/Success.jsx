var React = require("react");
var NavBar = require('./NavBar');

class Success extends React.Component {
  render() {

    return (
      <NavBar>
          <h1> Success! </h1>
      </NavBar>

    );
  }
}

module.exports = Success;