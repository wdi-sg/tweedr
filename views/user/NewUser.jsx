var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              name<input name="name" type="text" />
            </div>
            <div className="user-attribute">
              email<input name="email" type="text" />
            </div>            
            <div className="user-attribute">
              password<input name="password" type="text" />
            </div>
            <div className="user-attribute">
              photo<input name="photo" type="text" />
            </div>
            <div>
            <button type="submit"/>SUBMIT</button>
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
