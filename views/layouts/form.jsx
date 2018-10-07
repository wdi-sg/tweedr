const React = require('react');

class UserForm extends React.Component {
    render() {

        let formPath = this.props.formPath;

        return(
            <form method='POST' action={formPath}>

            {this.props.formPage === "login" &&
            <div className='row'>
                <div className='col-md-6 ml-auto mr-auto'>
                    <div className='form-group'>
                        <label for='username'>Username</label>
                        <input type='text' className='form-control'
        )
    }
}