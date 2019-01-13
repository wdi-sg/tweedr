var React = require("react");
var NavBar = require('../NavBar');

class Tweet extends React.Component {
  render() {
    return (
      <NavBar>
        <form className="user-form col-6 tweet-form" method="POST" action={"/edited/tweet/"+this.props.list[0].id}>
            <div className="form-group tweet-attribute">
              <label htmlFor="inputTweet">How do you want your tweet to be?</label>
              <input type="text" className="form-control" name="tweet" id="tweet" defaultValue={this.props.list[0].tweet} />
            </div>
            <button name="submit" type="submit" className="btn btn-primary">Tweet!</button>
          </form>
      </NavBar>
    );
  }
}

module.exports = Tweet;
