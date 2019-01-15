var React = require("react");

class Default extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
                </head>
                <body>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <a className="nav-link" href="/tweets">Home <span className="sr-only">(current)</span></a>
                          </li>

                          <li className="nav-item">
                            <a className="nav-link" href="/user/logout">Logout</a>
                          </li>

                        </ul>
                      </div>
                    </nav>

                    {this.props.children}
                </div>
                </body>
            </html>
        );
    }
}

module.exports = Default;
