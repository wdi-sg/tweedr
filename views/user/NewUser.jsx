const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <form className="user-form" method="POST" action="/users">
          <div className="user-attribute">
            name
            <input name="name" type="text" />
          </div>
          <div className="user-attribute">
            password:
            <input name="password" type="text" />
          </div>
          <input name="submit" type="submit" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = NewUser;
