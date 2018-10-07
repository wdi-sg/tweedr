var React = require("react");
var Layout = require('../layout/layout');

const sha256 = require('js-sha256');
const SALT = "tweedr";

class NewTweed extends React.Component {
	render () {

		let cookies = this.props.cookies;

		if (cookies.loggedin === sha256(cookies.userid + SALT)) {
			
			return (
				<form method="POST" action="/tweed" className="form-inline my-3">
					<input type="text" name="content" className="form-control mr-2 col-9 col-sm-10 col-lg-11 mb-1" placeholder="What ya thinking?" required autoComplete="off"/>
					<input type="hidden" name="userid" value={cookies.userid} />
					<input type="submit" value="Submit" className="btn btn-sm btn-success col"/>
				</form>
			)

		} else {
			return <div />
		}
	}
}

class Index extends React.Component {
  render() {
    
    let tweeds = this.props.tweeds.map(tweed => {			
			return (
        <div key={tweed.id} className="col-12">
          <div className="card p-3 my-2 shadow-sm">
						<p className="my-1"><strong><a href={"/users/" + tweed.userid} className="text-secondary">{tweed.username}</a></strong> <span className="small ml-1"> {tweed.created_at}</span></p>
            <p className="mb-2">{tweed.content} </p>  
          </div>
        </div>
      )
    });

    return (
      
      <Layout title="Tweedr" cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">Tweedr</h1>
					<NewTweed cookies={this.props.cookies} />
				</div>
          {tweeds}
      </Layout>
    )
  }
}

module.exports = Index;
