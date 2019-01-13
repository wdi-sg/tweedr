var React = require("react");

class Home extends React.Component {
  render() {

    let tweets = this.props.list.map( tweets => {

        let date = tweets.created_at.toString();

        return (
            <h1>
              {tweets.name} has tweeted:"{tweets.tweet}" at {date}.
            </h1>
            );
        });

    return (
      <div>
          {tweets}
      </div>
    );
  }
}

module.exports = Home;