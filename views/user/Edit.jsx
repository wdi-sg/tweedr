const React = require('react');
const Layout = require('../layout/Layout');

class Edit extends React.Component {
  render() {
    const cancelUrl = `/users/${this.props.username}`;
    const updateUrl = `/users/${this.props.user.name}?_method=PUT`;

    return (
      <Layout username={this.props.username}>
        <form action={updateUrl} method="POST">
          <textarea
            className="form-control"
            name="bio"
            defaultValue={this.props.user.bio}
            rows="3"
            required
          />
          <div className="d-flex justify-content-end align-items-center">
            <a className="btn btn-secondary mr-2" href={cancelUrl}>Cancel</a>
            <input className="btn btn-primary my-3" type="submit" value="Update" />
          </div>
        </form>
      </Layout>
    );
  }
}

module.exports = Edit;
