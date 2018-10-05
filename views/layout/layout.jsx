var React = require('react');

// class LogoutButton extends React.Component {

//   render () {
    
//     if (this.props.cookies.loggedin) {
//       return (
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item nav-link"> 
//             <a className="nav-link" href={'/users/' + this.props.cookies.user}>{this.props.cookies.username}</a>
//           </li>
//           <li className="nav-item nav-link">
//             <form method="POST" action="/users/logout" className="form-inline navbar-right">
//               <input type="submit" className="btn btn-outline-light" value="Logout" />
//             </form>
//           </li>
//         </ul>

//       )
//     } else return (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item"> 
//           <form method="GET" action="/">
//             <div className="btn-group">
//               <input type="submit" className="btn btn-outline-light" value="Login" />
//               <input type="submit" className="btn btn-outline-light" value="Register" formAction="/users/new" />
//             </div>
//           </form>
//         </li>
//       </ul>
//     )
//   }
// }

class Layout extends React.Component {

  render () {
    
    return (

      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
        </head>
        <body>
					<nav>
						
					</nav>
          <div className="container">
            <main className="row">
              {this.props.children}
            </main>
          </div>
        </body>
      </html>

    )
  }
}

module.exports = Layout;
