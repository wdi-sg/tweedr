var React = require("react");
const Default = require('../layout/Default')

class NewUser extends React.Component {
  render() {

    let taken;
    if(this.props.cookie === 'true') {

        taken = <header><p>The Username Is Already Taken</p></header>
    }

    return (

        <Default title="Register">
          {taken}
          <h1>REGISTER</h1>
          <form className="user-form" method="POST" action="/register">
            <div className="user-attribute">
              Username<input name="username" type="text" autoComplete="off"/>
            </div>
            <div className="user-attribute">
              Password:<input name="password" type="text" autoComplete="off" />
            </div>
            <input value="Register" type="submit" />
          </form>
        </Default>
    );
  }
}

module.exports = NewUser;
