var React = require("react");

class Home extends React.Component {
  render() {

    let tweets = this.props.list.map( tweets => {

        return (
            <p>
              {tweets.user_id} has tweeted:"{tweets.content}".
            </p>
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