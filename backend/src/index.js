//server
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


const path = require('path');

//secrets
const config = require('../../config');


//middlewares 
const bodyParser = require('body-parser');


//database
const connect = require('./db')

//server settings
const port = process.env.PORT || 3000 //port
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // convert json

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(cors({
    exposedHeaders: ['x-access-token', 'id-user-controll']
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})


//routes settings
const main = require('./routes/user');
const images = require('./routes/images');
app.use('/', main);
app.use('/images', images);

app.listen(port, () => {
    console.log('App escuchando en el puerto ' + port);
    connect(process.env.MONGO);
})

module.exports = app;