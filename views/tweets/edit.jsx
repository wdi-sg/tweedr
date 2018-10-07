var React = require('react');
var DefaultLayout = require('../layouts/default');

class Edit extends React.Component {
	render(){
		var actionUrl = '/tweets/'+this.props.id+'?_method=PUT';
		//console.log(this.props);
		return(
			<DefaultLayout title="Edit tweet" subtitle="EDIT TWEET">
				<form class="needs-validation" method="POST" action={actionUrl}>
					<div class="form-row">
						<div class="col-md-6 mb-4">
							<label for="validationCustom01">Tweet Id</label>
							<input class="form-control" id="validationCustom01" name="id" value={this.props.id} readOnly="readonly"/>
						</div>
						<div class="col-md-6 mb-4">
    						<label for="validationCustom02">Tweet</label>
							<input class="form-control" id="validationCustom02" name="tweet" value={this.props.tweet}/>
						</div>
					</div>
					<button class="btn btn-primary btn-lg btn-block" type="submit">Edit</button>
				</form>
			</DefaultLayout>
		)
	}
}

module.exports = Edit;