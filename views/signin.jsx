var React = require("react");
var Defaultcss = require('./defaultcss');

class Signin extends React.Component {
  render() {
    if(this.props.list !== undefined){
    return (
      <Defaultcss>
      <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
              <strong>Please Read!</strong><br /> Error unable to login. Please double check again your username and password that you have input to see whether they are correct.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <form method="POST" action="/user/signin">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </Defaultcss>
    );
  }
  else{
    return (
      <Defaultcss>
          <form method="POST" action="/user/signin">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </Defaultcss>
    );
  }
}
}

module.exports = Signin;