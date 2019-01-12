var React = require("react");
var Defaultcss = require('./defaultcss');

class Newuser extends React.Component {
  render() {
    return (
      <Defaultcss>
          <form method="POST" action="/users/add">
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" className="form-control" placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <small id="emailHelp" className="form-text text-muted">Please fill up your personal particulars below</small>
            <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input name="name" type="text" className="form-control" placeholder="Enter name" required />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Photo URL</label>
                <input name="photo" type="text" className="form-control" placeholder="Enter photo url" required />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Nationality</label>
                <input name="nat" type="text" className="form-control" placeholder="Enter nationality" required />
            </div>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="validatedCustomFile" />
            <label className="custom-file-label" for="validatedCustomFile">Choose image...</label>
            <div className="invalid-feedback">Example invalid custom file feedback</div>
          </div>
          <br/>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </Defaultcss>
    );
  }
}

module.exports = Newuser;