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

app.listen(4242, ()=>console.log('Express Server is running at port no : 4242'));



//checking by using get that mySql Server is connected by node.js or not.
app.get('/authentication', (req, res)=> {
    mysqlConnection.query('SELECT * FROM auth_table',(err, rows, fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows).status(200);
        }
        else{
            console.log('err');
            res.sendStatus(400);
        }
    })
});