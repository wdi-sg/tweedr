const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <form className="mt-5" method="POST" action="/tweeds">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-12 col-form-label">
              Tweed Away!
            </label>
            <div className="col-sm-10">
              <input
                name="content"
                className="form-control"
                type="text"
                required
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
