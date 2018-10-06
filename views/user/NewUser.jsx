var React = require("react");
var DefaultLayout = require('../layout/Default');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout title="Register New User">

          <form className="user-form" method="POST" action="/users">
            <h1>Create an account</h1>
            <div className="user-attribute">
              name <input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password: <input name="password" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>

       </DefaultLayout>
    );
  }
}

module.exports = NewUser;
