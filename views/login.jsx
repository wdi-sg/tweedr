var React = require ('react');
var DefaultLayout = require ('./default');

class Login extends React.Component {
    render () {
        return(
            <DefaultLayout>
                <fieldset>
                    <legend> Log in </legend>
                        <form method="POST" action="/users/login">
                            <div> name: <input name="name" type="text" />
                            </div>
                            <div >password: <input name="password" type="text" />
                            </div>
                            <input name="submit" type="submit" />
                        </form>
                </fieldset>
            </DefaultLayout>
        )
    }
}

module.exports = Login;