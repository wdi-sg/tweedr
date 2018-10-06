const React = require('react');
const Layout = require('../layout/Layout');

class Index extends React.Component {
  render() {
    const userLoggedIn = this.props.username;
    let users;

    if (userLoggedIn) {
      if (this.props.users) {
        users = this.props.users.map(user => {
          const userUrl = `/users/${user.name}`;
          let followUrl;
          let button;

          if (this.props.following.includes(user.name)) {
            followUrl = '/users/followers?_method=DELETE';
            button = (
              <input
                type="submit"
                className="btn btn-primary"
                value="Following"
              />
            );
          } else {
            followUrl = '/users/followers';
            button = (
              <input
                type="submit"
                className="btn btn-outline-primary"
                value="Follow"
              />
            );
          }

          return (
            <div key={user.id} className="col-sm-6 col-md-4 my-3">
              <div className="card border-secondary">
                <div className="card-body">
                  <h5 className="card-title">
                    <a href={userUrl}>
                      {user.name}
                    </a>
                  </h5>
                  <p className="card-text">{user.bio}</p>
                  <form action={followUrl} method="POST">
                    <input type="hidden" name="user_name" value={user.name} />
                    <input type="hidden" name="follower_name" value={userLoggedIn} />
                    {button}
                  </form>
                </div>
              </div>
            </div>
          );
        });
      } else {
        users = <p>No user</p>;
      }
    }

    return (
      <Layout username={userLoggedIn}>
        <div className="row">
          {users}
        </div>
      </Layout>
    );
  }
}

module.exports = Index;
