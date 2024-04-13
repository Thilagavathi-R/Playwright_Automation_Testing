var app = require('express')();

app.get('*', (req, res) =>  {
  
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'mypssssss1!',
        server: 'MyComputerName001\\SQL2016Instance', 
        database: 'MyDbName' 
    };

    (async function () {
        try {
            let pool = await sql.connect(config)

            let result1 = await pool.request()                
                .query('select * from Devices')
   
            // console.dir(result1) 
            // send records as a response
            res.send(result1);
        } catch (err) {
            //  error checks
        }
    })();
    
    sql.on('error', err => {
        // error handler
        console.log(err);
    });

    
});

//start listening
var port = process.env.PORT || 5321;
app.listen(port, function () {
    console.log('Application started on ' + new Date());
    console.log("Listening on " + port);
});