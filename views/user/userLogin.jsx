var React = require("react");
var DefaultLayout = require('../layouts/default');

class Home extends React.Component {
  render() {
    return (
      <DefaultLayout title="User login" subtitle="User login">
          <form className="user-form" method="POST" action="/users/login">
            <div className="user-attribute">
              name: <input name="name" type="text" />
            </div>
            <div className="user-attribute">
              password: <input name="password" type="password" />
            </div>
            <p/>
            <input value="Submit" type="submit" />
          </form>
          <p/>
          <form method="GET" action='/users/new'>
            <input type="submit" value="Sign up"/>
          </form>

        </DefaultLayout>
    );
  }
}

module.exports = Home;
