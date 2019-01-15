module.exports = (dbPoolInstance) => {
    
    let login = (callback) => {
        const name = `SELECT name FROM users`;
        const password = `SELECT password FROM users`;

        dbPoolInstance.query(name, (err, results) => {
        //     let checktrue = 0;
        //     // response.send(results.rows[0].name)
        //     for (let i = 0; i < results.rows.length; ++i) {
        //         if (results.rows[i].name == request.body.name) {
        //             checktrue = 1;
        //         }
        //         console.log(results.rows[i].name);
        //         console.log(request.body.name);
        //     };

        //     if (checktrue === 1) {
        //         response.cookie('loggedin', 'true');
        //         response.redirect('/users/profile')
        //     } else {
        //         response.send(`different user ${request.body.name}`)            }

        // })
        
        callback(results.row)
    
        });
    }
    return {
        login,
    };
};