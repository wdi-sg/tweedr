var React = require("react");

class login extends React.Component {
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
          <form className="user-form" method="POST" action="/">
            <div className="form-row">
              <div className="form-group col-md-9">
                <h2>Log In</h2>
                Email:
                <input name="name" type="text" className="form-control" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                Password:
                <input name="password" type="text" className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-primary" name="submit">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = login;
