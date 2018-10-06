import React from 'react'
const Header = require('../layout/Header')

class ShowUser extends React.Component {
  render () {
    return(
      <html>
				<Header cookies= {this.props.cookies} />
        <p>Show User</p>
				<p>User ID : {this.props.user.user_id}</p>
				<p>Name : {this.props.user.name}</p>
				<p>Followers : </p>
				<p>Following : </p>
				<form method="POST" action={"/users/"+ this.props.user.user_id + "/follow"}>
					<button type="submit">Follow</button>
				</form>
      </html>
    )

  }
}

module.exports = ShowUser;
