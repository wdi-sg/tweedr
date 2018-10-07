var React = require('react');

class LoginLayout extends React.Component {
  render() {
    return (
        <html>
                <head>
                        <title>{this.props.title}</title>
                        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>
                        <link rel="stylesheet" type="text/css" href="/style.css"></link>

                </head>
                <body>
                   {this.props.children}
                </body>
            </html>
    );
  }
}

module.exports = LoginLayout;