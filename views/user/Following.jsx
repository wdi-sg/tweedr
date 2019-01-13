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
        <h1 key={tweets.id}>
           {tweets.name} tweeted:"{tweets.tweet}" on {date}.
        </h1>
      );
    });

    return (
      <NavBar>
        <form method="POST" action={"/user/seeFollowing"} id="followeeForm">
          <select class="custom-select" name="id">
            <option selected>Choose...</option>
            {followees}
          </select>
          <div class="input-group-append">
            <button class="btn btn-outline-info" type="submit">See user's tweets</button>
          </div>
        </form>
        {tweets}
      </NavBar>
    );
  }
}

module.exports = Following;