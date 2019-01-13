var React = require("react");
var DefaultLayout = require('./default');

class Home extends React.Component {
    render() {
        let pulled = this.props.list[0];


        return (
            <DefaultLayout>
            <div>
             <div class="row justify-content-center">

                <div class="col-4">
                       <div className = "float left img-fluid">
                              <img src = {pulled.photo_url} alt = "Photo not found"/>
                            </div>
                        </div>
    <div class="col-6">
          <div >
            <h1> Tweetdr Profile: </h1>
            <hr/>
            <h3> Tweetdr Id : {pulled.id} </h3>
            <h3> Name: {pulled.name}</h3>
            <h3> Username : {pulled.username}</h3>
            </div>
                        </div>
    </div>
    </div>




                        </DefaultLayout>
        );
    }
}


module.exports = Home;