const React = require('react');
const Layout = require('../layout/Layout');
const NewTweet = require('./NewTweet');

class Index extends React.Component {
  render() {
    let newTweet;
    let tweets;

    if (this.props.username) {
      newTweet = <NewTweet />;

      if (this.props.tweets) {
        tweets = this.props.tweets.map(tweet => {
          let date = tweet.time_created.getDate();
          date = date < 10 ? '0' + date : date;
          let month = tweet.time_created.getMonth();
          month = month < 10 ? '0' + month : month;
          const year = tweet.time_created.getFullYear();
          let hours = tweet.time_created.getHours();
          hours = hours < 10 ? '0' + hours : hours;
          let minutes = tweet.time_created.getMinutes();
          minutes = minutes < 10 ? '0' + minutes : minutes;
          let seconds = tweet.time_created.getSeconds();
          seconds = seconds < 10 ? '0' + seconds : seconds;
          const time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

          return (
            <div key={tweet.id} className="card border-secondary my-3">
              <div className="card-body">
                <h5 className="card-title">{tweet.author}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{time}</h6>
                <p className="card-text">{tweet.tweet}</p>
              </div>
            </div>
          );
        });
      }
    }

    return (
      <Layout username={this.props.username}>
        {newTweet}
        <div className="container my-5">
          {tweets}
        </div>
      </Layout>

    );
  }
}

module.exports = Index;
