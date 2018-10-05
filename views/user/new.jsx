var React = require("react");
var Layout = require('../layout/layout');

class NewUser extends React.Component {
  render() {
    return (
      <Layout title="Login" cookies={this.props.cookies}>
        <div className="col">
          <h1 className="my-4">Create User</h1> 
          <form method="POST" action="/users">
            <div className="form-group">
              <label>Sign Up:</label>
              <input type="text" name="name" className="form-control" placeholder="Username" required autoComplete="off"/>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" className="form-control" required/>
            </div>
            <input type="submit" value="Submit" className="btn"/>
          </form>
        </div>        
      </Layout>
    );
  }
}

module.exports = NewUser;
