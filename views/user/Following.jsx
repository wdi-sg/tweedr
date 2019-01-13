var React = require("react");
var NavBar = require('../NavBar');

class Following extends React.Component {
  render() {

    let followees = this.props.following.map( followee => {
      return (
        <option value={followee.followee_id}>
            {followee.name}
        </option>
        );
      });

    let tweets = this.props.list.map( tweets => {
      let date = tweets.created_at.toString();
      return (
        <p key={tweets.id}>
           {tweets.name} tweeted:"{tweets.tweet}" on {date}.
        </p>
      );
    });

    return (
      <NavBar>
        <form method="POST" action={"/user/seeFollowing"} id="followeeForm">
          <select className="custom-select" name="id">
            <option selected>Choose...</option>
            {followees}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">See user's tweets</button>
          </div>
        </form>
        {tweets}
      </NavBar>
    );
  }
}

module.exports = Following;