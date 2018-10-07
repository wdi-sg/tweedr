const React = require('react');
const Header = require('../layouts/Header');

class allusers extends React.Component {

    render() {

        const users = this.props.user.map(user => {
            var link = '/users/' + user.username + '/userpage';

            return(
                <li><a href={link}>{user.username}</a></li>
            );
        });

        return(
            <html>
                <Header cookies = {this.props.cookies} />
                <div>All Users</div>
                <ul>
                    {users}
                </ul>
            </html>
        );
    };
};

module.exports = allusers;