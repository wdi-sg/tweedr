var React = require("react");
var DefaultLayout = require ('./default');

class New extends React.Component {
  render() {
    return (
        <DefaultLayout>
            <html>
                <head/>
                    <body>
                        <h3>Login User!</h3>
                             <form action="" method="POST">
                            <input name="name" placeholder="name"/>
                            <input name="password" placeholder="pass"/>
                            <input type="submit" />
                            </form>
                    </body>
            </html>
      </DefaultLayout>
    );
  }
}


module.exports = New;