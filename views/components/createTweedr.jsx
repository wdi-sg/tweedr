var React = require("react");

class CreateTweedr extends React.Component {
    render() {
        let formAction = '/' + this.props.id + '/tweedr'
        return (
            <form className="createTweedr" method="POST" action={formAction}>
                <div>
                    <h3>Write Tweedr</h3>
                    <input name="tweedr" type="text" />
                    <input name="submit" type="submit" />
                </div>
            </form>
        )

    }
}

module.exports = CreateTweedr;