var React = require("react");
var Default = require("../default");

class AllTweeds extends React.Component {

    render() {
        let tweeds = this.props.tweeds.map((tweed, index) => {
            return (
                <tr key={tweed.tweed}>
                    <td>{index+1}</td>
                    <td>{tweed.tweed}</td>
                    <td>{tweed.user_id}</td>
                </tr>
            )
        })
        return (
            <Default>
                <table>
                    <tr>
                        <td>#</td>
                        <td>Tweed Content</td>
                        <td>Posted By</td>
                    </tr>
                    {tweeds}
                </table>
            </Default>
        )
    }
}

module.exports = AllTweeds;