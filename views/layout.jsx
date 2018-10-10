const React = require('react');

 class Layout extends React.Component {
   render() {
     return (
       <html>
         <head>
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
           <link
             href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
             rel="stylesheet"
             integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
             crossOrigin="anonymous"
           />
           <title>{this.props.title}</title>
         </head>
         <body>
           <header>
             <nav className="navbar navbar-light bg-light">
               <a className="navbar-brand font-weight-bold" href="/artists">
                 TUNR
               </a>
               <form className="form-inline">
                 <input
                   className="form-control mr-sm-2"
                   type="search"
                   placeholder="Artist"
                   aria-label="Search"
                 />
                 <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                   Search
                 </button>
               </form>
             </nav>
           </header>
           <div className="container-fluid">{this.props.children}</div>
         </body>
       </html>
     );
   }
 }

 module.exports = Layout;