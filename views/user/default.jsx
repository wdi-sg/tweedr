var React = require("react");

class Default extends React.Component {
    render() {
        return (
            <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <title>Tunr</title>
            </head>
            <body>
                <h1>DEFAULT</h1>
                {this.props.children}
            </body>
            </html>
        );
    };
};

module.exports = Default;