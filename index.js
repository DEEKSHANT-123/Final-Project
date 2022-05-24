const mysql = require('mysql');  //import mysql package
const express = require('express'); //import express package
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());//access json data


var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'djjs.org', 
    database : 'authentication'   
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB Connection Succede.');
    else
        console.log('DB Connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, ()=>console.log('Express Server is running at port no : 3000'));



//insert
app.post('/authentication', (req, res)=> {
    let auth = req.body;   //create object
    var sql = "SET @email = ?;SET @password = ?;SET @color = ?; \
    CALL new_procedure(@email,@password,@color);";   //new_preocedure is name of our store procedure in our table auth_table.
    mysqlConnection.query(sql, [auth.email, auth.password, auth.color],(err, rows, fields)=>{
        if(!err)
            console.log(rows);
        else
            console.log('err');
    })
});