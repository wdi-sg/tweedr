var React = require('react');

class Profile extends React.Component {
  render() {
    return (
       <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/profile">
            <div className="user-attribute">
              Tweets<br/><input name="tweets" type="text" />
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;