var React = require("react");
var Layout = require('../layout/layout');
var ErrorMessage = require('../layout/error');

const sha256 = require('js-sha256');
const SALT = "tweedr";

class Edit extends React.Component {
  render() {

		let cookies = this.props.cookies;
		let tweed = this.props.tweed;

		if (cookies.loggedin === sha256(cookies.userid + SALT) && parseInt(cookies.userid) === tweed.user_id) {

			return (
				<Layout title="Edit Tweed" cookies={this.props.cookies}>
					<div className="col">
						<h1 className="my-4">Edit</h1>
						<form method="POST" action={"/tweed/" + tweed.id + "?_method=PUT"}>
							<div className="form-group">
								<input type="hidden" name="id" value={tweed.id} />
								<textarea name="content" className="form-control" defaultValue={tweed.content} rows="3" required autoComplete="off"/>
							</div>
							<input type="submit" value="Edit" className="btn btn-primary"/>
							<input type="submit" value="Delete" className="btn btn-danger mx-2" formAction={"/tweed/" + tweed.id + "?_method=DELETE"}/>
						</form>
					</div>
				</Layout>
			)
		} else {
			return (
				<Layout title="Edit Tweed" cookies={this.props.cookies}>
				< div className="col my-4">
					<ErrorMessage errorMessage="User does not match poster of tweed!" />
				</div>
				</Layout>
			)
		}
  }
}

module.exports = Edit;
