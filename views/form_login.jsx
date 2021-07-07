var React = require("react");
var DefaultLayout = require('./default');

class form_login extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <body>
          <h3>Log in</h3>
                    <form action="/users/login" method="POST">
                        <div class="form-group">
                            <label>Name</label>
                            <textarea name="name" placeholder="Enter name" className="form-control" rows="1"/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <textarea name="password" placeholder="Enter password" className="form-control" rows="1" />
                        </div>
                            <input type="submit" className="btn btn-primary text"/>
                    </form>
        </body>
      </DefaultLayout>
    );
  }
}

module.exports = form_login;