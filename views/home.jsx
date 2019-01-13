var React = require("react");
var Defaultcss = require('./defaultcss');

class Tweets extends React.Component{
    render(){
        return(
            <div>
                <div className="modal fade" id={"exampleModal" + this.props.list.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-danger" id="exampleModalLabel">Tweet Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-danger">
                        This tweet is created by <strong>{this.props.list.name}</strong>. Do you want to check out his/her profile? Click <strong>close</strong> to return to main menu or click <strong>view profile</strong> to proceed to user profile.
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <form method="GET" action={"/profile/" + this.props.list.id}>
                            <button type="submit" value="Delete" className="btn btn-primary">View Profile</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                    <ul>
                        Tweet: {this.props.list.content} <br />
                        <input type="submit" className="details" value="Show Details" data-toggle="modal" data-target={"#exampleModal" + this.props.list.id}/>
                    </ul>
                </div>
            </div>
            );
    }
}

class Home extends React.Component {
  render() {
    if(this.props.list !== undefined){
        const tweets = this.props.list.map( tweet => {
                return <Tweets list={tweet}></Tweets>;
            });
    return (
        <Defaultcss>
            <h1>Welcome To Tweedr {this.props.user[0]}.</h1>
            <h6>Check your followers and follows in users tab.</h6>
            <form method="GET" action={"/users/tweet/" + this.props.user[0] + "/new"}>
                <input type="submit" className="tweet" value="Create Tweet"/>
            </form>
            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Use navbar to navigate to users which are your follows and followers, to sign up and to login. You can check out your profile with your details. In order to see tweets in the home page please login. Check for cookie in chrome console to see if you are logged in or the welcome line above as you will see who you are logged in as. Thanks!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {tweets}
        </Defaultcss>
    );
  }
else{
    return (
        <Defaultcss>
            <h1>Welcome To Tweedr.</h1>
            <form method="GET" action="/user/signin">
                <input type="submit" className="tweet" value="Create Tweet"/>
            </form>
            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Use navbar to navigate to users which are your follows and followers, to sign up and to login. You can check out your profile with your details. In order to see tweets in the home page please login. Check for cookie in chrome console to see if you are logged in or the welcome line above as you will see who you are logged in as. Thanks!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        </Defaultcss>
    );
  }
}
}

module.exports = Home;