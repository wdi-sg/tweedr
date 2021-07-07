var React = require("react");
var DefaultLayout = require('./default');


class home extends React.Component {
    render()  {
        let tweets = this.props.tweets.map(tweet => {
            return (
                <div className="card" styles="width: 18rem;">
                  <div className="card-body">
                    <h5 className="card-title">@{tweet.name}</h5>
                    <p className="card-text">{tweet.msg}</p>
                    <img src={tweet.photo_url}/>
                  </div>
                </div>

            );
        });


        return(

            <DefaultLayout>
                <body>
                    <div className="row">
                        <div className="col">
                            <h3>{this.props.user_profile[0].name}'s profile</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <img src={this.props.user_profile[0].profile_url} className="profilePic"/>
                        </div>
                    </div>
                    <br/>
                    <h3>Post a tweet</h3>
                        <form action="/user/tweet/new" method="POST">
                            <div class="form-group">
                                <label>Tweet Msg</label>
                                <textarea name="msg" placeholder="Enter tweet" className="form-control" rows="1"/>
                            </div>
                            <div class="form-group">
                                <label>Photo URL</label>
                                <textarea name="photo_url" placeholder="Enter photo URL" className="form-control" rows="3"/>
                            </div>
                            <input type="submit" className="btn btn-primary text"/>
                        </form>
                    <br/>
                    <h3>Tweets that you are following</h3>
                    {tweets}
                </body>
            </DefaultLayout>
        )
    }
}


module.exports =home;