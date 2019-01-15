var React = require("react");
var Default = requuire("default");
// this form creates a new user account and sends to the Database
class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        </head>
        <body>

            <Default>
                <h3>Welcome!</h3>
                <a className="btn btn-primary" href="/tweets" role="button">Get started!</a>
            </Default>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
