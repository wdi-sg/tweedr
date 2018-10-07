var React = require("react");

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <style></style>
        </head>
        <body>
            {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
