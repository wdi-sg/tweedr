import React from "react";
const sha256 = require("js-sha256");

class Header extends React.Component {
  render() {
    // Salt for Hash
    const SALT = "aKiRa is a PokeMON";

    const checkSessionCookieHash = sha256(
      this.props.cookies.user_id + "logged_id" + SALT
    );
    // Initializing a variable to track whether User is logged in or not.
    // The variable can then be used in a Ternary to render login/logout button.
    let isLoggedIn = false;
    if (this.props.cookies.loggedIn === checkSessionCookieHash) {
      isLoggedIn = true;
    }
    return (
      <html>
        <header>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossorigin="anonymous"
          />
        </header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Tweedr
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="/">
                Home
              </a>
              <a className="nav-item nav-link" href="/tweets/new">
                Create a New Tweet
              </a>
              <a className="nav-item nav-link" href="/users/new">
                Create a New User
              </a>
            </div>
						<span className="float-right">
						{isLoggedIn ? (<form method='GET' action="/users/logout"><span>Current User ID : {this.props.cookies.user_id}</span><button
							className="btn btn-outline-danger my-2 my-sm-0" type="submit">Log Out</button></form>) : (
            <form className="form-inline my-2 my-lg-0" method='POST' action="/users/login">
              <input
                className="form-control mr-sm-2"
                type="text"
								name="name"
                placeholder="Username"
              /><input
                className="form-control mr-sm-2"
                type="password"
								name="password"
                placeholder="Password"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Log In
              </button>
            </form>)}
					</span>
          </div>
        </nav>
      </html>
    );
  }
}

module.exports = Header;
