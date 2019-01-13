var React = require('react');

class LoggedInUser extends React.Component {
    render() {

        const allTweets = this.props.tweets.map( tweet => {
            return <li>"{tweet.content}" - user ID: {tweet.author_id}</li>
        });

        return (
            <html>
                <head>
                    <title>Tweedr Home</title>
                </head>

                <body>
                    <h3>Logged in</h3><br />
                    <h3>All tweets:</h3>
                    <ul>{allTweets}</ul>

                    <button><a href="/tweets/new">Create a Tweet</a></button>
                    <button><a href="/logout">Log Out</a></button>
                </body>
            </html>
            )
    }
}

module.exports = LoggedInUser;