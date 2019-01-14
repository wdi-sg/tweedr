var React = require('react');

class LoginPage extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>Log In</title>
                </head>

                <body>

                <h1>Log in here</h1>
                <form action="" method="POST">
                    <input name="username" placeholder="username"/>
                    <input name="password" placeholder="password"/>
                    <input type="submit" />
                </form>

                </body>
            </html>

            )
    }
}

module.exports = LoginPage;