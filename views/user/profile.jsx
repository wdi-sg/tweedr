var React = require("react");
var Layout = require('../layout/layout');
var ErrorMessage = require('../layout/error');

const sha256 = require('js-sha256');
const SALT = "tweedr";

class FollowButton extends React.Component {
	render () {

		let cookies = this.props.cookies;

		let loggedinUser = parseInt(cookies.userid);

		if (cookies.loggedin === sha256(cookies.userid + SALT) && loggedinUser !== this.props.user.id) {

			let alreadyFollowing = false;

			for (let i in this.props.followers) {
				if (this.props.followers[i].id === loggedinUser) {
					alreadyFollowing = true;
					break;
				}
			}

			if (alreadyFollowing === false) {
				
				return (
					<div className="col-12">
						<form method="POST" action="/follow" className="mt-2 mb-4">
							<input type="hidden" name="userid" value={this.props.user.id} />
							<input type="hidden" name="followerid" value={cookies.userid} />
							<input type="submit" value="Follow" className="btn btn-primary"/>
						</form>
					</div>
				)

			} else {
				
				return (
					<div className="col-12">
						<form method="POST" action="/follow?_method=delete" className="mt-2 mb-4">
							<input type="hidden" name="userid" value={this.props.user.id} />
							<input type="hidden" name="followerid" value={cookies.userid} />
							<input type="submit" value="Unfollow" className="btn btn-primary"/>
						</form>
					</div>
				)
			}
		
		} else {
			return <div />
		}
	}
}

class Followers extends React.Component {
	render () {

		if (this.props.followers.length === 0) {
			return <div />
		} else {

			let followers = this.props.followers.map(follower => {
				return (
					<li key={follower.id}><a href={"/users/" + follower.id} className="text-secondary">{follower.name}</a></li>
				)
			})

			return (
				<div className="col-12">
					<div className="card p-3 my-2 shadow-sm">
						<h4>Followers:</h4>
							<ul>
								{followers}
							</ul>
					</div>
				</div>
			)
		}
	}
}

class Follows extends React.Component {
	render () {

		if (this.props.follows.length === 0) {
			return <div />
		} else {

			let follows = this.props.follows.map(follows => {
				return (
					<li key={follows.id}><a href={"/users/" + follows.id} className="text-secondary">{follows.name}</a></li>
				)
			})

			return (
				<div className="col-12">
					<div className="card p-3 my-2 shadow-sm">
						<h4>Following:</h4>
							<ul>
								{follows}
							</ul>
					</div>
				</div>
			)
		}
	}
}

class Profile extends React.Component {
	render() {
		
		let user = this.props.user;	
    return (
			
			<Layout title={user.name + "'s Profile"} cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="mt-4 mb-2">{user.name}</h1>
        </div>
					<ErrorMessage errorMessage={this.props.errorMessage} />
					<FollowButton user={user} cookies={this.props.cookies} followers={this.props.followers} />
					<Followers followers={this.props.followers} />
					<Follows follows={this.props.follows} user={user} />
      </Layout>
    )
  }
}

module.exports = Profile;
