import React from 'react'
const Header = require('../layout/Header')

class ShowUser extends React.Component {
  render () {
		const userTweets = this.props.userInfo.map(user => {
			return (
				<div key={user.user_id}>{user.content}</div>
			)
		})
    return(
      <html>
				<Header cookies= {this.props.cookies} />
        <p>Show User</p>
				<p>User ID : {this.props.userInfo[0].user_id}</p>
				<p>Name : {this.props.userInfo[0].name}</p>
				<p>Tweets :</p>
				<ul>{userTweets}</ul>
				<form method="POST" action={"/users/"+ this.props.userInfo[0].user_id + "/follow"}>
					<button type="submit">Follow</button>
				</form>
      </html>
    )

  }
}

module.exports = ShowUser;
