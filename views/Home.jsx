var React = require("react");

class Home extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/style.css" />
                </head>
                <body>
                    <div>
                        <h2>Welcome to Tweedr</h2>

                        <a href = "/users/new">Create New User</a>
                        <br/>
                        <a href = "/users/login">Login User</a>
                        <br/>
                        <a href = "/tweeds/new">New Tweed</a>
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = Home;