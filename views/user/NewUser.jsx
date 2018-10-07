var React = require("react");

class NewUser extends React.Component {
  render() {
    return ( 
      <html>
        <head>
          <link rel = "stylesheet" type = "text/css" href = "/style.css" />
        </head>
        <body>
          <div>
            <h2>New User</h2>
            <form className="user-form" method="POST" action="/users">
              <div className="user-attribute">
                name: <input name="name" type="text" placeholder = "Name" />
              </div>
              <div className="user-attribute">
                password: <input name="password" type="text" placeholder = "Password" />
              </div>
              <input name="submit" type="submit" />
            </form>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = NewUser;
