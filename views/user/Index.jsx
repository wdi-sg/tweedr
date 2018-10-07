var React = require("react");
var DefaultLayout = require('../layout/Default');

class UserIndex extends React.Component {
  render() {
        console.log("this.props is: ", this.props.users);
        const link = '/tweets/new';
        //const followLink = '/users/follow';
        const userMapping = this.props.users.map(user => { //rmb to enclose the h1 and p tag into a div tag as you can only return one tag and not 2 tags simultanously
          return (
            <div>
                <li>{user.content}</li>
            </div>
            )
        })
    return (
        <DefaultLayout title="user profile">
            <h1>Profile Setting of {this.props.users[0].name} </h1>
            <h2>List of tweets: </h2>
            <ol>
                {userMapping}
            </ol>
            <hr/>
            <h3>What would you like to do currently?</h3>
            <a href={link}>Create Tweets</a>
        </DefaultLayout>
    );
  }
}

module.exports = UserIndex;
