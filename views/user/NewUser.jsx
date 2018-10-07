const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <form className="mt-5" method="POST" action="/users">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-12 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                name="name"
                className="form-control"
                type="text"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-12 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                name="password"
                className="form-control"
                type="password"
                require
              />
            </div>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = NewUser;
