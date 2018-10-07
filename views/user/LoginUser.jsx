var React = require("react");

class LoginUser extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/style.css" />
                </head>
                <body>
                    <div>
                        <h2>Login User</h2>
                        <form className="login-user-form" method="POST" action="/users/login">
                            <div className="user-attribute">
                                name: <input name="name" type="text" placeholder="Name" />
                            </div>
                            <div className="user-attribute">
                                password: <input name="password" type="text" placeholder="Password" />
                            </div>
                            <input name="submit" type="submit" />
                        </form>
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = LoginUser;