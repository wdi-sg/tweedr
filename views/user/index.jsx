var React = require("react");
var Layout = require('../layout/layout');

class Index extends React.Component {
  render() {
    
    let users = this.props.users.map(user => {			
			return (
        <div key={user.id} className="col-12">
          <div className="card p-3 my-2 shadow-sm">
						<h4>{user.name}</h4>  
          </div>
        </div>
      )
    });

    return (
      
      <Layout title="Users" cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">Users</h1>
        </div>
          {users}
      </Layout>
    )
  }
}

module.exports = Index;
