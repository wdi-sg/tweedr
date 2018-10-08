var React = require("react");

 class Login extends React.Component {
   render() {
     return (
       <html>
         <head />
         <body>
           <form method="POST" action="/login">
             <div>
              <h2>
               Name:<input name="name" type="text" required />
              </h2>
             </div>
             <div>
              <h2>
               Password:<input name="password" type="number" required />
              </h2>
             </div>
             <input type="submit" value="Submit" />
           </form>
         </body>
       </html>
     );
   }
 }

 module.exports = Login;