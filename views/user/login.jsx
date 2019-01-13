var React = require("react");
var Default = require("../default");

class Login extends React.Component {
  render() {
    let errorMessage;
    if (this.props.error === 'password'){
      errorMessage = (<small className="text-danger">{'You entered the wrong password!'}</small>)
    } else if (this.props.error === 'username'){
      errorMessage = (<small className="text-danger">{'You entered an incorrect username!'}</small>)
    }
    return (
      <Default>
        <h2>Login</h2>
        {errorMessage}
        <form className="user-form" method="POST" action="/users/login">
            <div className="user-attribute">
              name<input name="username" type="text" />
            </div>
            <div className="user-attribute">
              password:<input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
      </Default>
    );
  }
}

module.exports = Login;
