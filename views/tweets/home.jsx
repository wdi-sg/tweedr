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
          <div>
            <form method="POST" action={actionUrl}>
              {tweet.tweet} 
              <a href={aTag}>Edit</a> 
              <button type="submit" class="delete">Delete</button>
            </form>
          </div> 
        )
      }
      else { 
        return (
          <div>
            {tweet.tweet}
          </div> 
        )
      }
    })

    return (
          <DefaultLayout title="Tweets" subtitle="TWEEDR">
          <div class="container">
            <div class="tweet">
              <form method="POST" action='/tweets/new'>
                <input name="tweet" placeholder="Enter tweet"/>
                <input name="user_id" value={this.props.userid} type="hidden"/>
                <input type="submit" value="Submit"/>
              </form>
            </div>
            <div class="col new">
              {tweets}
            </div>
          </div>
          </DefaultLayout>
    );
  }
}

module.exports = Home;
