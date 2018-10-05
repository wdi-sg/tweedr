var React = require("react");
var Layout = require('../layout/layout');

class ErrorMessage extends React.Component {
	render () {

		console.log(this.props);

		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">{this.props.errorMessage}</div>
			)
		} else {
			return <div />
		}
	}
}

class NewUser extends React.Component {
  render() {
    return (
      <Layout title="Login" cookies={this.props.cookies}>
        <div className="col">
          <h1 className="my-4">Login</h1>
					<ErrorMessage errorMessage={this.props.errorMessage}/>
          <form method="POST" action="/users/login">
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="name" className="form-control" placeholder="Username" required autoComplete="off"/>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" className="form-control" required/>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary"/>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = NewUser;
