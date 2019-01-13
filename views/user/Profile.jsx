var React = require("react");
var NavBar = require('../NavBar');

class Profile extends React.Component {
  render() {
    return (
      <NavBar>
        <form className="user-form col-6 tweet-form" method="POST" action="http://localhost:3000/user/tweet">
            <div className="form-group tweet-attribute">
              <label htmlFor="inputTweet">What do you wish to tweet?</label>
              <input type="text" className="form-control" name="tweet" id="tweet" placeholder="tweeting..."/>
            </div>
            <button name="submit" type="submit" className="btn btn-primary">Tweet!</button>
          </form>
      </NavBar>
    );
  }
}

module.exports = Profile;
