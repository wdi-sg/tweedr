var React = require("react");

class Main extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="../style.css" />
          <title>Tunr Express</title>
        </head>
        <body>
          <ul className="nav nav-pills navHeight sticky-top" style={{ background: "lightgrey", height: "3.5rem" }}>
            {/* <li className="nav-item" style={{ margin: "auto 5px" }}>
              <a className="nav-link active" href="/artist/">
                Login
              </a>
            </li> */}
          </ul>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Welcome to Tweedr!</h1>
            <p className="lead text-center">Not Twitter, geez...</p>
            <hr className="my-4" />
            <form action="/login" method="post">
              <div className="row" style={{ width: "70%", marginLeft: "23%" }}>
                <div className="col">
                  <input name="username" className="form-control" placeholder="Username" />
                  <small id="emailHelp" className="form-text text-muted">New to Tweedr? <a href="/users/new">Sign up</a></small>
                </div>
                <div className="col">
                  <input name="password" className="form-control" placeholder="Password" />
                </div>
                <div className="col">
                  <p className="lead">
                    <button className="btn btn-primary" type="submit">Log In</button>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
        </body>
      </html >
    );
  }
}

module.exports = Main;
