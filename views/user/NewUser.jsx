const React = require('react');
const Layout = require('../layout/Layout');

class NewUser extends React.Component {
  render() {
    return (
      <Layout>
        <form action="/users" method="POST">
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              pattern=".{6,}"
              title="6 characters minimum"
              required
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Register"
          />
        </form>
      </Layout>
    );
  }
}

module.exports = NewUser;
