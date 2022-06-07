const mysql = require('mysql');  //import mysql package
const express = require('express'); //import express package
var app = express();
const bodyParser = require('body-parser');
var cors=require('cors')
app.use(bodyParser.json());//access json data
const bcrypt = require('bcrypt'); //for hash password
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


// //INSERT
app.post('/authentication', (req, res)=> {
    var email=req.body.email;
    var password=req.body.password;
    // const saltRounds = 10;

    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         password=hash;
    //     });
    // });
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
})
});


app.post('/getcolor', (req, res)=> {
    var email=req.body.email;
    console.log(req.body);
    var sql="SELECT color FROM auth_table WHERE email =?";
    mysqlConnection.query(sql,[email],function(err, result){
        if (err) throw err;
               console.log(result);
                res.send(result);
              });
          
});

app.post('/login', (req, res)=> {
    var email=req.body.email;
    var password=req.body.password;
    var sql="SELECT * FROM auth_table WHERE email=? and password=?";
    mysqlConnection.query(sql,[email,password],function(err, result){
        if (err) throw err;
               
                res.send(result);
              });
          
});
