const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <form className="tweed-form" method="POST" action="/tweeds">
          <div className="user-attribute">
            Tweed
            <input name="content" type="text" />
          </div>
          <input name="submit" type="submit" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = NewUser;
