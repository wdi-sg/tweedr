var React = require("react");

 class Index extends React.Component {
   render() {
     return (
       <html>
         <head />
         <body>
         <div>Welcome to Tweedr</div>
         <div>
           <span><a href="/users/new">Create a new user</a></span>
           <div>Welcome to Tweedr</div>
           <div>
             <span>
               <a href="/users/new">Create a new user</a>
             </span>
           </div>
           <div>
             <span>
               <a href="/users/login">Log In</a>
             </span>
           </div>
           <div>
           <span><a href="/users/login">Log In</a></span>
         </div>
             <span>
               <a href="/tweets/new">Create a New Tweet</a>
             </span>
           </div>
         </body>
       </html>
     );
   }
 }

 module.exports = Index;