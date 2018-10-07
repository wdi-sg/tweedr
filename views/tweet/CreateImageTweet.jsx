const React = require('react');
const Default = require('../layout/Default');

class CreateImageTweet extends React.Component {

    render() {

        return(

            <Default title="Create Tweet">
                <header>
                    <h1>TWEEDR</h1>
                </header>
                <h1>Tweet An Image</h1>
                <form method="POST" action="/tweet/image" encType="multipart/form-data">
                    <h3>Upload An Image</h3>
                    <input type="file" name="imageTweet" /><br/>
                    <input type="submit" value="Submit" />
                </form>
            </Default>
    )};
};

module.exports = CreateImageTweet;