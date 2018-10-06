var React = require("react");

class UserIndex extends React.Component {
  render() {
        console.log("this.props is: ", this.props.users);
        const link = '/tweets/new';
    return (
      <html>
        <head />
        <body>
            <h1>Welcome, {this.props.users.name}!</h1>
            <h3>What would you like to do currently?</h3>
            <a href={link}>Create Tweets</a>
        </body>
      </html>
    );
  }
}

module.exports = UserIndex;
