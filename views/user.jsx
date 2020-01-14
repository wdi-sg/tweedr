var React = require ('react');
var DefaultLayout = require ('./default');

class User extends React.Component {
    render () {

        const userTweet = this.props.user;
        console.log(userTweet);
        return(
            <DefaultLayout>
                <fieldset>
                    <legend> Tweet! </legend>
                        <form method="POST" action="/">
                            <textarea rows="10" cols="80" name = "tweet" placeholder= "Your tweet here!">
                            </textarea>
                            <input name="submit" type="submit" />
                        </form>
                </fieldset>

            </DefaultLayout>
        )
    }
}

module.exports = User;