var React = require("react");
var LoginLayout = require('./layout/loginlayout');


class userHome extends React.Component {

  render() {

      console.log("userhome-props:", this.props.tweets);


let userPost;

       if(this.props.tweets[0].title === null && this.props.tweets[1] === undefined) {

        userPost = (<div className="no-posts"><h2>No posts yet!</h2>
            </div>);
        }
         else {

          userPost = this.props.tweets.map(tweet=> {

        return (<div className="has-posts"><h2>{tweet.title}</h2>
                <h3>by {tweet.name}</h3>
                  <p>{tweet.content}</p>
                </div>);
        });

        } ;



    return (

    <LoginLayout title={this.props.tweets.name}>
      <html>
        <head />
        <body>
          <div className="name-header">Hello, <a href={"/profile/"+this.props.tweets[0].name}>{this.props.tweets[0].name}!</a>&nbsp;&nbsp;&nbsp;<a href={"/logout/"+this.props.tweets[0].name}>Logout</a>
          </div>
          <h1>Your Tweedr</h1>
          <div className="new-post">Write a new post:</div>
          <div className="new-div">
          <form className="user-form" method="POST" action="/users/post">
            <div className="post-id">
              <input className="user-id" name="user_id" type="hidden" value={this.props.tweets[0].user_id} />
            </div>
            <div className="post-name">
              <input className="name" name="name" type="hidden" value={this.props.tweets[0].name} />
            </div>
            <div className="post-title">
              Title:<input className="title" name="title" type="text" required="required" />
            </div>
            <div className="post-content">
              <input className="content" name="content" type="text" required="required" placeholder="How are you feeling today?" />
            </div>
            <input className="submit" name="submit" type="submit" />
          </form>
          </div>
          {userPost}
        </body>
      </html>
    </LoginLayout>
    );
  }
}

module.exports = userHome;
