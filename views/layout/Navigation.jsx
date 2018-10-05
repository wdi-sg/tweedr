const React = require('react');

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/tweets" className="nav-link">Tweedr</a>
          </li>
        </ul>
        <a href="/login" className="btn btn-outline-primary">Login</a>
        <a href="/users/new" className="btn btn-outline-primary ml-2">Register</a>
      </nav>
    );
  }
}

module.exports = Navigation;
