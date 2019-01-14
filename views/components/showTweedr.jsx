var React = require("react");

class showTweedr extends React.Component {
    render() {
        return(
            <li>{this.props.tweedr}</li>
            )
    }
}

module.exports = showTweedr;