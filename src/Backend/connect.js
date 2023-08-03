const mysql = require('mysql2')
const express = require ('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()
app.use(cors())
app.use(express.json())
var auth = false
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Bala@1999',
    database:'admin'
})

app.post('/api/deleteUserDetail',(req,res)=>{
    console.log(req.body)
    const{userId}=req.body
    const query = `delete from userdetails where userid=${userId}`
    connection.query(query,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        res.status(200).send('Data saved successfully'+result)
    })
})

app.post('/api/addUserDetail',(req,res)=>{
    console.log(req.body)
    const{userId,userName,userCity,userComments}=req.body
    const query = `insert into userdetails values (${userId},"${userName}","${userCity}","${userComments}")`
    connection.query(query,(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else{
            res.status(200).send("sucess")
        }
    })
})

app.post('/api/CurrentUserDetails',(req,res)=>{
    console.log(req.body)
    const{userId}=req.body
    const query = `select * from userdetails where userid = ${userId}`
    connection.query(query,(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post('/api/editUserDetail',(req,res)=>{
    console.log(req.body)
    const{userId,userComments}=req.body
    const query = `update userdetails set comments ="${userComments}" where userid=${userId}`
    connection.query(query,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.status(200).send('Data saved successfully'+result)
        }
       
    })
})

app.post('/api/login',(req,res)=>{
    const {username,password} = req.body
    console.log(username,password)
    const query = `select * from admincredentials where username = binary "${username}" and password = binary "${password}"`
    connection.query(query,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        console.log(result)
        if(result.length!=0)
        {
            auth=true
            const payload = {username : req.body.username, password : req.body.password}
            const secret = "AdminLogin"
            const token = jwt.sign(payload,secret,{expiresIn:'1s'})
            res.status(200).send(token)
            console.log("jwt")     
        }
        else{
            res.send("invalid")
        }
    })
})


app.get('/api/getUserDetails',(req,res)=>{
    connection.query('select * from userdetails',(err,rows,fields)=>{
        if(err)
        {
            console.log("Error:"+err.stack)
        }
        else{
            res.send(rows)
        }
    })
})

app.listen(5000,()=>{
    console.log("server is started")
})
