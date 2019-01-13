var React = require("react");
var NavBar = require('./NavBar');

class Home extends React.Component {
  render() {

    let tweets = this.props.list.map( tweets => {

        let date = tweets.created_at.toString();

        return (
            <h1 key={tweets.id}>
              {tweets.name} has tweeted:"{tweets.tweet}" at {date}.
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

module.exports = Home;