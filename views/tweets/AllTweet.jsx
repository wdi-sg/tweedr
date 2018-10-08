var React = require("react");

class UserHome extends React.Component {
  render() {
    let deleteURL = '/logout' +'?_method=DELETE';
    const tweets = this.props.tweets.map((tweet)=>{
        return (<li>{tweet.tweet}</li>);

    });
    return (
      <html>
        <head />
        <body>
          <ul>
              {tweets}
          </ul>

          <form method = 'POST' action ={deleteURL}>
          <input type='submit' value='logout'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = UserHome;
