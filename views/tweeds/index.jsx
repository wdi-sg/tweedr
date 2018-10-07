var React = require("react");
var Layout = require('../layout/layout');

const sha256 = require('js-sha256');
const SALT = "tweedr";


class LoggedIn extends React.Component {
	render () {

		let cookies = this.props.cookies;

		if (cookies.loggedin === sha256(cookies.userid + SALT)) {
			
			return (
				<div className="col-12">
					<form method="POST" action="/tweed" className="form-inline my-3">
						<input type="text" name="content" className="form-control mr-2 col-9 col-sm-10 col-lg-11 mb-1" placeholder="What ya thinking?" required autoComplete="off"/>
						<input type="hidden" name="userid" value={cookies.userid} />
						<input type="submit" value="Submit" className="btn btn-sm btn-primary col"/>
					</form>
					<div className="btn-group">
						<a className="btn btn-outline-secondary px-3" href="/tweeds/">All Tweeds</a> 
						<a className="btn btn-outline-secondary px-3" href="/tweeds/?only=following">Following</a> 
						<a className="btn btn-outline-secondary px-3" href="/tweeds/?only=followers"> Followers</a> 				
					</div>
				</div>
			)

		} else {
			return <div />
		}
	}
}

class EditButton extends React.Component {
	render () {

		let tweed = this.props.tweed;

		if (parseInt(this.props.cookies.userid) === tweed.userid) {

			return (
				<form method="GET" action={"/tweed/" + tweed.id + "/edit"} className="form-inline ml-auto btn-group">
					<input type="submit" value="Edit" className="btn btn-sm btn-outline-secondary" />
				</form>
			)

		} else {
			return <span />
		}
	}
}


class Index extends React.Component {
  render() {

		console.log (this.props.tweeds);
    
    let tweeds = this.props.tweeds.map(tweed => {			
			return (
        <div key={tweed.id} className="col-12">
          <div className="card p-3 my-2 shadow-sm">
						<p className="my-1"><strong><a href={"/users/" + tweed.userid} className="text-secondary">{tweed.username}</a></strong> <span className="small ml-1"> {tweed.created_at}</span></p>
            <p className="mb-2">{tweed.content} </p>
						<EditButton tweed={tweed} cookies={this.props.cookies} />  
          </div>
        </div>
      )
    });

    return (
      
      <Layout title="Tweedr" cookies={this.props.cookies}>
        <div className="col-12">
          <h1 className="my-4">Tweedr</h1>
				</div>
					<LoggedIn cookies={this.props.cookies} />
          {tweeds}
      </Layout>
    )
  }
}

module.exports = Index;
