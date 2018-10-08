var React = require("react");

class IndividualUser extends React.Component {
  render() {
  let actionURL = '/users/' + this.props.tweets[0].id
  let tweet = this.props.tweets[0].tweet
  let userName = this.props.tweets[0].name

    return (
      <html>
        <head />
        <body>
        <p>{tweet}</p>
        <p>posted by <a href={actionURL}>{userName}</a></p>


        </body>
      </html>
    );
  }
}

module.exports = IndividualUser;
