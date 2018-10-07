var React = require("react");
var DefaultLayout = require('../layout/Default');

class Website extends React.Component {
  render() {
    return (
      <DefaultLayout title="Welcome to Tweedr">
      <div className="websiteWrapper margin-x-sm ">
        <div className="website">
          <h1>Welcome to Tweedr</h1>
          <img src={'https://git.generalassemb.ly/wdi-nyc-goat/LAB_Tweedr/raw/master/assets/tweedr.png'} alt="Tweedr"></img>
        </div>
        {/* <div className="index">
          <form action="/users/new">
            <input type="submit" value="Register" />
          </form>
          <form action="/login">
            <input type="submit" value="Login" />
          </form>
        </div> */}
      </div>
       </DefaultLayout>
    );
  }
}

module.exports = Website;
