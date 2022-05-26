const mysql = require('mysql');  //import mysql package
const express = require('express'); //import express package
var app = express();
const bodyParser = require('body-parser');
var cors=require('cors')
app.use(bodyParser.json());//access json data
app.use(cors())

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'djjs.org', 
    database : 'authentication',
    multipleStatements: true   
});

// mysqlConnection.connect((err)=>{
//     if(!err)
//         console.log('DB Connection Succede.');
//     else
//         console.log('DB Connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });

app.listen(4242, ()=>console.log('Express Server is running at port no : 4242'));


//INSERT
app.post('/authentication', (req, res)=> {
    var email=req.body.email;
    var password=req.body.password;
    var color=req.body.color;
mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO auth_table (email, password, color) VALUES (?,?,?)";
    mysqlConnection.query(sql, [email,password,color], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send(result);
      });
    // mysqlConnection.query(sql, function (err, result) {
    // if (err) throw err;
    //   console.log("1 record inserted");
    // });
})
});


// app.get('/authentication', (req, res)=> {
//     mysqlConnection.query('SELECT color FROM auth_table WHERE email = req.body.email',(err, rows, fields)=>{
//         if(!err){
//             res.send(color);
//         }    
//         else{
//             console.log('err');
//             res.sendStatus(400);
//         }
//     })
// });


