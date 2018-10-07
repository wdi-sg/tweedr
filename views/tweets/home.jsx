var React = require("react");
var DefaultLayout = require('../layouts/default');

class Home extends React.Component {
  render() {

    let tweets = this.props.tweets.map(tweet => {
      let userId = tweet.user_id;
      let aTag = '/tweets/'+tweet.id;
      let actionUrl = '/tweets/'+tweet.id+'?_method=delete';

      if(parseInt(this.props.userid) === userId && this.props.loggedin === 'true') {
        return (
          <li>
            <form method="POST" action={actionUrl}>
              {tweet.tweet} 
              <a href={aTag}>Edit</a> 
              <button type="submit" class="btn-sm btn-outline-dark">Delete</button>
            </form>
          </li> 
        )
      }
      else { 
        return (
          <li>
            {tweet.tweet}
          </li> 
        )
      }
    })

    return (
          <DefaultLayout title="Tweets" subtitle="Tweets">
            <form method="POST" action='/tweets/new'>
              <input name="tweet"/>
              <input name="user_id" value={this.props.userid} type="hidden"/>
              <input type="submit" value="Submit"/>
            </form>
            <ul>
              {tweets}
            </ul>
          </DefaultLayout>
    );
  }
}

module.exports = Home;
