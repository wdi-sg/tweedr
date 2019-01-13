var React = require("react");
// this form creates a new user account and sends to the Database
class Home extends React.Component {
  render() {
    return (
      <html>
        <head> Welcome to Tweedr </head>
        <body>
            <tweet />

        </body>
      </html>
    );
  }
}

module.exports = Home;