var React = require("react");
var DefaultLayout = require('../layout/Default');

class LoginPage extends React.Component {
  render() {
    return (
        <DefaultLayout title="login page">
          <form className="user-form" method="POST" action="/users/status">
            <h1>Login</h1>
            <div className="user-attribute">
              Name: <input name="name" type="text" />
            </div>
            <br/>
            <div className="user-attribute">
              Password: <input name="password" type="text" />
            </div>
            <br/>
            <input name="LOGIN" type="submit" />
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = LoginPage;
