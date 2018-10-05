var React = require('react');

class Login extends React.Component {

  render () {

		console.log(this.props.cookies);
    
    if (this.props.cookies.loggedin) {
      return (
				<div className="navbar-nav ml-auto">
					<form method="POST" action="/users/logout" className="form-inline nav-item nav-link">
							<input type="submit" className="btn btn-link p-0 text-light" value="Logout" />
					</form>
				</div>
      )
    } else {
			return (
				<div className="navbar-nav ml-auto">
					<form method="GET" action="/users/login" className="form-inline nav-item nav-link">
						<input type="submit" className="btn btn-link p-0 text-light" value="Login" />
					</form>
					<form method="GET" action="/users/new" className="form-inline nav-item nav-link">
						<input type="submit" className="btn btn-link p-0 text-light" value="Register" />
					</form>
				</div>
			)			
		} 
  }
}

class Layout extends React.Component {

  render () {
    
    return (

      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
        </head>
        <body>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
						<a className="navbar-brand mb-0 h1" href="#">Tweedr</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<div className="navbar-nav mr-auto">
								<a className="nav-item nav-link" href="/tweeds/">Tweeds</a>
								<a className="nav-item nav-link" href="/users/">Users</a>
							</div>
							<Login cookies={this.props.cookies}/>
						</div>
          </div>
        </nav>
          <div className="container">
            <main className="row">
              {this.props.children}
            </main>
          </div>
        </body>
				<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" />
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
      </html>
    )
  }
}

module.exports = Layout;
