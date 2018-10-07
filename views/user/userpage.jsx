const React = require('react');
const Header = require('../layouts/Header');

class userpage extends React.Component {

    render() {

        const userTweets = this.props.user.map(user => {
            return(
                <li>{user.content}</li>
            )
        })

        return(
            <html>
                <Header cookies = {this.props.cookies} />
                <p>{this.props.params.username}'s Page</p>
                <p>Avatar: INSERT IMAGE URL HERE</p>
                <p>Tweets: </p>
                <ul>
                    {userTweets}
                </ul>
                <form method='POST' action={"/users/" + this.props.params.username + "/follow"}>
                    <button type='submit'>Follow</button>
                </form>
            </html>
        );
    };
};

module.exports = userpage