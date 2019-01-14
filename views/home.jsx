var React = require('react');

class Home extends React.Component {
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
                    <h3>All tweets:</h3>
                    <ul>{allTweets}</ul>

                    <button><a href="/users/new">Register</a></button>
                    <button><a href="/login">Login</a></button>
                </body>
            </html>
            )
    }
}

module.exports = Home;