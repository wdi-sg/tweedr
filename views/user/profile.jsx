var React = require("react");
var Default = require("././default");

class Profile extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        </head>
        <body>
            <Default>
                <a className="btn btn-primary" href="/tweets" role="button">Follow</a>
            </Default>
        </body>
      </html>
    );
  }
}

module.exports = Profile;
