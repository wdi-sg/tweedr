var React = require("react");
var NavBar = require('../NavBar');

class FollowSuccess extends React.Component {
  render() {

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
          {tweets}
      </NavBar>
    );
  }
}

module.exports = FollowSuccess;