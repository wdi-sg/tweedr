var React = require("react");

class HomePage extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <h1> Welcomt to tweedr </h1>
          <form method="GET" action="/users/new">
            <input type="submit" value="New User"/>
          </form>

          <form method="GET" action="/users/login">
            <input type="submit" value="Login"/>
          </form>

        </body>
      </html>
    );
  }
}

module.exports = HomePage;
