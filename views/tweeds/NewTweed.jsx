var React = require("react");

class NewTweed extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/style.css" />
                </head>
                <body>
                    <div>
                        <h2>New Tweed</h2>
                        <form className="tweed-form" method="POST" action="/tweeds">
                            <div className="tweed-attribute">
                                <input name="tweed" type="text" placeholder="What's Happening?" />
                            </div>
                            <input name="submit" type="submit" />
                        </form>
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = NewTweed;