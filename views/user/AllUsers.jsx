var React = require("react");

class AllUser extends React.Component {
  render() {
    const users = this.props.users.map((user)=>{
        let actionURL = '/users/' + user.id
        return (<li><a href={actionURL}>{user.name}</a></li>);
    });

    return (
      <html>
        <head />
        <body>
         <ul>{users}</ul>
        </body>
      </html>
    );
  }
}

module.exports = AllUser;
