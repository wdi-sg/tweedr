const React = require('react');
const Default = require('../layout/Default');

class Login extends React.Component {

    render() {

        let attempt;
        if (this.props.cookie === 'true') {

            attempt = <header><p>You Entered An Incorrect Username/Password</p></header>
        }

        return(

            <Default title="Login">
                {attempt}
                <div>
                    <h1>LOGIN</h1>
                    <form method="POST" action="/login">
                        Username:
                        <input type="text" name="username" />
                        <br/>
                        Password:
                        <input type="password" name="password" autoComplete="off"/>
                        <br/><br/>
                        <input type="submit" value="Log In" />
                    </form>
                    <a href="/register"><p>Not Yet A Member?</p></a>
                </div>
            </Default>
    )};
};

module.exports = Login;