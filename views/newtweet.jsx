var React = require ('react');
var DefaultLayout = require ('./default');

class newTweet extends React.Component {
    render() {

        return (
            <DefaultLayout>
                <form className="new-tweet" action="/tweet/" method="POST">
                    <div>
                        <h5>New Tweet : </h5>
                        <textarea className="input-group input-group-lg" name="content"></textarea>
                    </div>
                    <div>
                        <button type="submit"> Send Tweet </button>
                    </div>
                </form>
                </DefaultLayout>
        )
    }
}

module.exports = newTweet;