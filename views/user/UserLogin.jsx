var React = require("react");
var DefaultLayout = require('../layout/Default.jsx');

class Login extends React.Component {
  render() {
    return (
      <DefaultLayout title="New Task">

          <form className="login-form" method="POST" action="/login">
            <h1>Login to Tweedr</h1>
            <div className="login-attribute">
              <h3>Name: </h3> <input name="name" type="text" />
            </div>
            <div className="login-attribute">
              <h3>Password: </h3> <input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = Login;
