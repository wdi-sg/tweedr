const React = require("react");

class NewTweet extends React.Component {
  render() {
    return (
      <form method="POST" action="/tweets">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <textarea
              className="form-control"
              name="tweet"
              placeholder="What's happening?"
              rows="3"
              required
            />
          </div>
          <div className="col-md-1">
            <input className="btn btn-primary" type="submit" value="Tweet" />
          </div>
        </div>
      </form>
    );
  }
}

module.exports = NewTweet;
