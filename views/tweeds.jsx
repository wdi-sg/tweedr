var React = require("react");

class tweeds extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossOrigin="anonymous"
          />
        </head>
        <body>
          <form className="user-form" method="POST" action="/tweeds">
            <div className="form-group col-md-9">
              <h2>Welcome! {this.props.userName}</h2>
              <input
                name="name"
                type="hidden"
                className="form-control"
                value={this.props.userName}
              />
              <h4>Add a Tweet</h4>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <input name="tweed" type="text" className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-primary" name="submit">
                  Tweed
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                {this.props.tweedsContent.map(content => {
                  return (
                    <div>
                      <p>{content.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = tweeds;
