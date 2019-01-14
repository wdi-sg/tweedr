var React = require("react");
var CreateTweedr = require("./components/CreateTweedr");
var showTweedr = require("./components/showTweedr");

class HomePage extends React.Component {
  render() {
    // let showAllTweet = this.props.listOfTweedr.forEach
    return (
      <html>
        <head />
        <body>
            <h2>Hello {this.props.user.name}</h2>
            <CreateTweedr id={this.props.id}>
            </CreateTweedr>
            <ul>

            </ul>
        </body>
      </html>
    );
  }
}

module.exports = HomePage;