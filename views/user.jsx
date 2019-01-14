var React = require ('react');
var DefaultLayout = require ('./default');

class User extends React.Component {
    render () {
        console.log(this.props.user);
        let users_Id = this.props.user[0].users_id;
        let link = `/user/${users_Id}/tweets/new`
        console.log(link);
        const userTweet = this.props.user.map ((data, index)=> {
            return <div key={index}>
                        <h4> @Myself </h4> <span> {data.post} </span>
                   </div>
        });


        return(
            <DefaultLayout>
                <fieldset>
                    <legend> Tweet! </legend>
                        <form method="POST" action={link}>
                            <textarea rows="10" cols="80" name = "tweet" placeholder= "Your tweet here!">
                            </textarea>
                            <input name="submit" type="submit" />
                        </form>
                </fieldset>
                    {userTweet}
            </DefaultLayout>
        )
    }
}

module.exports = User;