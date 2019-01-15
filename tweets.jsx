var React = require("react");
var Default = require("default");

class Tweets extends React.Component {
    render() {
        let tweetsInfo = this.props.tweets.map( (tweet, index) => { return (
            <p> <a href={tweet.username} className="text-muted" name="name"><strong>{tweet.name}</strong> <small name="username"><i>@{tweet.username}</i></small></a> <br/>{tweet.content}</p>

            );
        });
        return (
            <html>
                <head>

                </head>
                    <body>
                    <Default>
                        <form method="POST" action="/tweets">

                                <div >
                                    <textarea className="form-control" id="exampleFormControlTextarea1" name="newtweet" rows="10" placeholder="What's happening?"></textarea>
                                  </div>
                                  <button type="submit" className="btn btn-primary">Tweet</button>
                            </form>

                            <div className="col-sm-8">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item"><strong>Tweets</strong></li>
                                  <li className="list-group-item">{tweetsInfo}</li>
                                </ul>
                            </div>
                        </Default>
                    </body>
            </html>
            )
    }

}

module.exports = Tweet;
