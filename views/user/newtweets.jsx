var React = require("react");
var Default = require("././default");

class NewTweet extends React.Component {
    render() {
        let tweets = this.props.tweets.map( (tweet, index) => { return (
            <p> <a href={tweet.username} className="text-muted" name="name"><strong>{tweet.name}</strong> <small name="username"><i>@{tweet.username}</i></small></a> <br/>{tweet.content}</p>

            );
        });
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                </head>
                    <body>
                    <Default>
                        <div className="row">
                          <div className="col-sm-4">
                            <form method="POST" action="/tweets">

                                <div className="form-group mt-3">
                                    <textarea className="form-control" id="exampleFormControlTextarea1" name="newtweet" rows="10" placeholder="What's happening?"></textarea>
                                  </div>

                                  <button type="submit" className="btn btn-primary">Tweet</button>
                            </form>
                        </div>
                            <div className="col-sm-8">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item"><strong>Tweets</strong></li>
                                  <li className="list-group-item">{tweets}</li>
                                </ul>

                            </div>
                        </div>

                    </Default>
                    </body>
            </html>
            )
    }

}

module.exports = NewTweet;