var React = require("react");
var DefaultLayout = require('../layout/Default');
class HomePage extends React.Component {
  render() {
    const registerLink = "/users/new";
    const loginLink = "/users/login";
    return (
        <DefaultLayout title="home">
            <h1>Welcome to tweedr, where tweets bring people to be connected socially </h1>
            <h3>Please register or login to send tweets: </h3>
            <a href={registerLink}><input type="button" value="Register"></input></a>
            <br/>
            <a href={loginLink}><input type="button" value="Login"></input> </a>
            <hr/>
        </DefaultLayout>
    );
  }
}

module.exports = HomePage;
