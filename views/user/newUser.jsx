var React = require("react");
var DefaultLayout = require('../layouts/default');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout title="Create New User" subtitle="Create New User">
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              name: <input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password: <input name="password" type="text" />
            </div>
            <input value="Submit" type="submit" />
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = NewUser;
