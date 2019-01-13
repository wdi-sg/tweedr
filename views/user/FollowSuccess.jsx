var React = require("react");
var NavBar = require('../NavBar');

class Followed extends React.Component {
  render() {

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
          {tweets}
      </NavBar>
    );
  }
}

module.exports = Followed;