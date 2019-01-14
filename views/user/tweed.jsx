var React = require("react");
var Default = require("../default");

class Tweed extends React.Component {
  render() {
    return (
      <Default>
        <h2>{this.props.username}</h2>
        <form className="user-form" method="POST" action="/users/tweed">
            <div className="user-attribute">
              tweed<input name="tweed" placeholder="Tweed something" type="text" />
            </div>
            <input name="submit" type="submit" />
          </form>
      </Default>
    );
  }
}

module.exports = Tweed;
