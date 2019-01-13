var React = require("react");
var Default = require("../Default");

class Login extends React.Component {
  render() {
    return (
        <Default>
          <h2>Please login to view tweets.</h2><br/>
          <form className="user-form" method="POST" action="/login">
            <div className="user-attribute">
              Username: <input name="name" type="text" />
            </div>
            <div className="user-attribute">
              Password: <input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />

            <br/><br/>

            <h6>No account? Create one <a href="/users/new">here</a>.</h6>
          </form>
        </Default>
    );
  }
}

module.exports = Login;
