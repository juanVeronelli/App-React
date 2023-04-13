//server
const express = require('express');
const app = express();

//middlewares 
const bodyParser = require('body-parser');

//secrets
const config = require('./config');

//database
const connect = require('./db')

//server settings
const port = config.PORT || 3000 //port
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // convert json

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


//routes settings
const crud = require('./routes/user');
app.use('/', crud);


app.listen(port, ()=>{
    console.log('App escuchando en el puerto ' + port);
    connect(config.url);
})

module.exports = app;