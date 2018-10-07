var React = require("react");
var Layout = require('../layout/layout');
var ErrorMessage = require('../layout/error');

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

		console.log(this.props);
		
    return (
			
			<Layout title={user.name + "'s Profile"} cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">{user.name}</h1>
					<ErrorMessage errorMessage={this.props.errorMessage}/>
					<Followers followers={this.props.followers}/>
					<Follows follows={this.props.follows} user={user}/>
        </div>
      </Layout>
    )
  }
}

module.exports = Profile;
