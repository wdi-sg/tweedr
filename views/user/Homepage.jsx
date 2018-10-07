var React = require("react");
var DefaultLayout = require('../layout/Default');
class HomePage extends React.Component {
  render() {
    const registerLink = "/users/new";
    const loginLink = "/users/login";
    return (
        <DefaultLayout title="home">
            <h1 className="text-primary text-center">Welcome to tweedr</h1>
            <h3 className="text-secondary">Please register or login to send tweets: </h3>
            <div className="row">
                <div className="col-md-6">
                    <a href={registerLink}><button type="button" class="btn btn-info">Register</button></a>
                    <br/>
                </div>
                <div className="col-md-6">
                <a href={loginLink}><button type="button" class="btn btn-info">Login</button></a>
                <hr/>
                </div>
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = HomePage;
