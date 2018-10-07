const React = require('react');
const sha256 = require('js-sha256');

class Header extends React.Component {
    render() {
        const SALT = 'tweedr';

        let isLoggedIn = false;

        console.log(this.props.cookies)

        if( this.props.cookies != undefined ) {
            let sessionCookie = sha256(SALT + this.props.cookies.user);

            if ( this.props.cookies.loggedIn == sessionCookie ) {
                isLoggedIn = true;
            }
        }

        return(

            <html>
                <header>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
                </header>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a className='navbar-brand' href='#'>Navigation</a>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>
                            <a className='nav-item nav-link' href='/users'>Home</a>
                            <a className='nav-item nav-link' href='/tweets/new'>New Tweet</a>
                        </div>

                        <span className='float-right'>

                            {isLoggedIn ? (

                                <form method='GET' action='/users/logout'>

                                <span>Current User: {this.props.cookies.user}  </span>
                                <button className='btn btn-outline-danger' type='submit'>Log Out</button></form>) : (
                                <form method='POST' action='/users/login'>
                                    <input type='text' name='name' placeholder='Username'/>
                                    <input type='password' name='password' placeholder='Password'/>
                                    <button type='submit'>Log In</button>
                                    <a className='nav-item nav-link' href='../../users/new'>Sign Up!</a>
                                </form>
                                )}
                        </span>

                    </div>
                </nav>
            </html>
        )
    }
}

module.exports = Header;