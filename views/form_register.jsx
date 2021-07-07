var React = require("react");
var DefaultLayout = require('./default');

class form_register extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <body>
          <h3>Create a new account</h3>
                    <form action="/users/new" method="POST">
                        <div class="form-group">
                            <label>Name</label>
                            <textarea name="name" placeholder="Enter name to uniquely identify your tweeds" className="form-control" rows="1"/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <textarea name="password" placeholder="Enter password" className="form-control" rows="1" />
                        </div>
                        <div class="form-group">
                            <label>Profile photo URL</label>
                            <textarea name="profile_url" placeholder="Enter URL of profile photo" className="form-control" rows="4" />
                        </div>
                            <input type="submit" className="btn btn-primary text"/>
                    </form>
        </body>
      </DefaultLayout>
    );
  }
}

module.exports = form_register;