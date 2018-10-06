var React = require("react");

class HomePage extends React.Component {
  render() {
    const registerLink = "/users/new";
    const loginLink = "/users/login";
    return (
      <html>
        <head />
        <body>
            <h1>Welcome to tweedr, where tweets bring people to be connected socially </h1>
            <h3>Please register or login to send tweets: </h3>
            <a href={registerLink}><input type="button" value="Register"></input></a>
            <br/>
            <a href={loginLink}><input type="button" value="Login"></input> </a>
            <hr/>
        </body>
      </html>
    );
  }
}

module.exports = HomePage;
