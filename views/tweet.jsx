var React = require ('react');

class Tweet extends React.Component {
    render () {

        // const tweets = this.props.tweets.map;
        return(
                <fieldset>
                    <h1> Tweet! </h1>
                        <form className="user-form" method="POST" action="/tweets/new">
                        <p>Your message here: <input name="tweets" type="text"/>
                        </p>
                            <input name="submit" type="submit" />
                        </form>
                </fieldset>
        )
    }
}

module.exports = Tweet;