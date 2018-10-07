var React = require("react");

class ErrorMessage extends React.Component {
	render () {

		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">{this.props.errorMessage}</div>
			)
		} else {
			return <div />
		}
	}
}

module.exports = ErrorMessage;
