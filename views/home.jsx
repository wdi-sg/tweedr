var React = require ('react');
var DefaultLayout = require ('./default');

class Home extends React.Component {
    render () {
        return(
            <DefaultLayout>
                <h1> Welcome to Tweedr! </h1>
                    <a href='tweedr/users/login'> Log In </a>
            </DefaultLayout>
        )
    }
}

module.exports = Home;