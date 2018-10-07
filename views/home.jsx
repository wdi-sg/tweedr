var React = require("react");

class Homepage extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div className="links">
          <a href="/users/login">Login</a>
          <a href="/users/new">Register</a>
          </div>
          <h1>Welcome to Tweedr</h1>

        </body>
      </html>
    );
  }
}

module.exports = Homepage;
