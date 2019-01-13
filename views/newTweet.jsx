var React = require('react');

class NewTweet extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>Create new tweet</title>
                </head>

                <body>

                <h1>Create a new tweet:</h1>
                <form action="/tweets/new" method="POST">
                    <input name="content" placeholder="Tweet..."/>
                    <input type="submit" />
                </form>

                </body>
            </html>

            )
    }
}

module.exports = NewTweet;