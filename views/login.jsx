var React = require("react");

class Login extends React.Component {
    render() {
        return (
            <html>
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                </head>
                    <body>
                    <div class="container text-center pt-5 w-75" >
                        <h2>Welcome to Tweedr</h2>
                            <div className="container">
                              <div className="row">
                                <div className="col pt-5">
                                    <h4>Register</h4>
                                        <form action="/users" method="POST">
                                            <div className="form-group">
                                                <input name="name" placeholder="Name" className="form-control"/> <br/>
                                                <input name="reguser" placeholder="Choose a username" className="form-control"/> <br/>
                                                <input name="regpass" type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder="Password"/>
                                                <small id="passwordHelpBlock" class="form-text text-muted">
                                                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                                </small> <br/>


                                                <input name="submit" type="submit" className="btn btn-primary"/>
                                            </div>
                                        </form>
                                </div>
                                    <div className="col pt-5">
                                        <h4>Login</h4>
                                            <form action="/" method="POST">

                                                    <input name="username" placeholder="Username" className="form-control"/> <br/>
                                                    <input name="password" type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder="Password"/><br/>

                                                            <input className="form-check-input" type="checkbox" id="autoSizingCheck"/>


                                                    <input name="submit" type="submit" className="btn btn-primary"/>

                                            </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </body>
            </html>
            )
    }

}

module.exports = Login;
