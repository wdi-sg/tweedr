var React = require("react");
var Layout = require('../layout/layout');
var ErrorMessage = require('../layout/error');

class Index extends React.Component {
	render() {
		
		let user = this.props.user;
		
    return (
			
			<Layout title={user.name + "'s Profile"} cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">{user.name}</h1>
					<ErrorMessage errorMessage={this.props.errorMessage}/>
        </div>
      </Layout>
    )
  }
}

module.exports = Index;
