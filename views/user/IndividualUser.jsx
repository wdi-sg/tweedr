var React = require("react");

class IndividualUser extends React.Component {
  render() {
  let actionURL = '/users/' + this.props.currentUser
  let tweetURL = '/tweets/' +this.props.tweets[0].id
  const tweet = this.props.tweets.map((tweet)=>{
      return (<p><a href={tweetURL}>{tweet.tweet}</a></p>);
    });

  const followers = this.props.followers.map((followers) => {
    let url = '/users/' + followers.id
    return (<li><a href={url}>{followers.name}</a></li>);
  })

  const following = this.props.following.map((following) => {
    let url = '/users/' + following.id

    return (<li><a href={url}>{following.name}</a></li>);
  })

    return (
      <html>
        <head />
        <body>
        <h1>{this.props.tweets[0].name}'s tweets</h1>
         {tweet}

         <p>Followers: {followers}</p>
         <p>Following: {following}</p>

         <form method='POST' action ={actionURL}>
         <input type='submit' value='Follow User' />
         </form>

        </body>
      </html>
    );
  }
}

module.exports = IndividualUser;
