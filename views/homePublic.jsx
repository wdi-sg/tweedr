var React = require("react");
var DefaultLayout = require('./default');


class homePublic extends React.Component {
    render() {
        let tweets = this.props.tweets.map(tweet => {
            return (
                <div className="card" styles="width: 18rem;">
                  <div className="card-body">
                    <h5 className="card-title">@{tweet.user_name}</h5>
                    <p className="card-text">{tweet.msg}</p>
                    <img src={tweet.photo_url}/>
                  </div>
                </div>

            );
        });

        return(

            <DefaultLayout>
                <body>
                    <h3>Tweets</h3>
                    {tweets}
                </body>
            </DefaultLayout>
        )
    }
}


module.exports = homePublic;
