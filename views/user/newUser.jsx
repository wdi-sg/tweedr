var React = require("react");
var DefaultLayout = require('../layouts/default');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout title="Create New User" subtitle="Create New User">
          <form class="needs-validation" method="POST" action="/users">
            <div class="form-row">
              <div class="col-md-6 mb-4">
                <label for="validationCustom01">Name</label>
                <input class="form-control" id="validationCustom01" name="name" type="text"/>
              </div>
              <div class="col-md-6 mb-4">
                  <label for="validationCustom02">Password</label>
                <input class="form-control" id="validationCustom02" name="password" type="text"/>
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = NewUser;
