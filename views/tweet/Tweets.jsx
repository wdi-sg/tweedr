const React = require('react');

class Tweets extends React.Component {
  render() {
    let tweets;

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

        const authorUrl = `/users/${tweet.author}`;
        let buttons;

        if (this.props.username === tweet.author) {
          const editUrl = `/tweets/${tweet.id}`;
          const deleteUrl = `/tweets/${tweet.id}?_method=DELETE`;
          buttons = (
            <div>
              <a className="btn btn-sm btn-outline-secondary" href={editUrl}>Edit</a>
              <form className="d-inline" action={deleteUrl} method="POST">
                <input className="btn btn-sm btn-outline-danger ml-2" type="submit" value="Delete" />
              </form>
            </div>
          );
        }

        return (
          <div key={tweet.id} className="card border-secondary my-3">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                <a href={authorUrl}>{tweet.author}</a>
                {buttons}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">{time}</h6>
              <p className="card-text">{tweet.tweet}</p>
            </div>
          </div>
        );
      });
    } else {
      return <p>No tweet</p>;
    }

    return (
      <div className="container">
        {tweets}
      </div>
    );
  }
}

module.exports = Tweets;
