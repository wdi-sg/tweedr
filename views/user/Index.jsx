var React = require("react");

class UserIndex extends React.Component {
  render() {
        console.log("this.props is: ", this.props);
        const link = '/tweets/new';
        const userMapping = this.props.users.map(user => { //rmb to enclose the h1 and p tag into a div tag as you can only return one tag and not 2 tags simultanously
          return (
            <div>
              <p> {user.name}
              <input type="button" value="Follow" />
              </p>
              <p>
                <input type="button" value="Edit" />
                <input type="button" value="Delete" />
              <hr/>
              </p>
            </div>
            )
        })
    return (
      <html>
        <head />
        <body>
            <h1>Welcome to tweedr! Here are the list of users in tweedr! </h1>
            <h3>What would you like to do currently?</h3>
            <a href={link}>Create Tweets</a>
            <h3>List of tweedr users</h3>
            <hr/>
            {userMapping}
        </body>
      </html>
    );
  }
}

module.exports = UserIndex;
