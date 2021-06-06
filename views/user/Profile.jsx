var React = require("react");
var NavBar = require('../NavBar');

class Profile extends React.Component {
  render() {

    let followees = this.props.following.map( followee => {
      return (
        <option value={followee.followee_id}>
            {followee.name}
        </option>
        );
      });

    let followers = this.props.followers.map( follower => {
      return (
        <option value={follower.follower_id}>
            {follower.name}
        </option>
        );
      });

    let tweets = this.props.list.map( tweets => {
        let date = tweets.created_at.toString();
        return (
            <div>
              <p key={tweets.id} className = "d-inline-block">
                 {tweets.name} tweeted:"{tweets.tweet}" on {date}.
              </p>
              <form method="GET" action={"/edit/tweet/" + tweets.id } className = "d-inline-block">
                  <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
              </form>
              <form method="POST" action={"/delete/tweet/" + tweets.id + "?_method=DELETE"} className = "d-inline-block">
                  <button type="submit" className="btn btn-danger">Delete</button>
              </form>
            </div>
            );
        });

    return (
      <NavBar>
        <h1>You are following:</h1>
          <form method="POST" action={"/user/seeFollowing"} id="followeeForm">
          <select className="custom-select" name="id">
            <option selected>Choose...</option>
            {followees}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">See user's tweets</button>
          </div>
        </form>
        <h1>Your followers are:</h1>
          <form method="POST" action={"/user/seeFollowing"} id="followeeForm">
          <select className="custom-select" name="id">
            <option selected>Choose...</option>
            {followers}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">See user's tweets</button>
          </div>
        </form>
        <h1>Your tweets are as follows:</h1>
        {tweets}
      </NavBar>
    );
  }
}

module.exports = Profile;