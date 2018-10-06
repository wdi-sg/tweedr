var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
        <html>
                <head>
                <title>{this.props.title}</title>
                <link rel="stylesheet" href="/reset.css"></link>
                <link rel="stylesheet" href="/style.css"></link>
                </head>

                <body>

                <div className="container">
                    {this.props.children}
                </div>

                </body>
            </html>
    );
  }
}

module.exports = DefaultLayout;
