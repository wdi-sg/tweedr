var React = require("react");
var DefaultLayout = require('../layouts/default');

class Home extends React.Component {
  render() {
    return (
      <DefaultLayout title="User login" subtitle="USER LOGIN">
          <form class="needs-validation" method="POST" action="/users/login">
            <div class="form-row">
              <div class="col-md-6 mb-4">
                <label for="validationCustom01">Name</label>
                <input class="form-control" id="validationCustom01" name="name" type="text"/>
              </div>
              <div class="col-md-6 mb-4">
                  <label for="validationCustom02">Password</label>
                <input class="form-control" id="validationCustom02" name="password" type="password"/>
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
          </form>
          <p/>
          <form method="GET" action='/users/new'>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Register</button>
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
