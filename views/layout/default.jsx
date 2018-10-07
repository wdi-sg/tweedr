const React = require('react');

class Default extends React.Component {

    render() {

        return(

            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="/style.css"/>
                <title>{this.props.title}</title>
            </head>
            <body>
                {this.props.children}
            </body>
            </html>
    )};
};

module.exports = Default;