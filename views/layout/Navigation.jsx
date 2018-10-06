const React = require('react');

class Navigation extends React.Component {
  render() {
    let navItem;
    if (this.props.username) {
      const userUrl = `/users/${this.props.username}`;
      navItem = (
        <div>
          <a href="/users" className="btn text-secondary mr-3">Users</a>
          <a href={userUrl} className="btn">{this.props.username}</a>
          <a href="/logout" className="btn btn-outline-primary ml-2">Logout</a>
        </div>
      );
    } else {
      navItem = (
        <div>
          <a href="/login" className="btn btn-outline-primary">Login</a>
          <a href="/users/new" className="btn btn-outline-primary ml-2">Register</a>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/tweets" className="nav-link">Tweedr</a>
          </li>
        </ul>
        {navItem}
      </nav>
    );
  }
}

module.exports = Navigation;
