const path = require('path');
const express = require('express');
const helmet = require('helmet');

const routes = require('./routes');
const app = express();

// initialize middleware
app.use(express.json());
app.use(helmet());  
app.use(express.static(path.join(__dirname,'../public')));

app.use('/api',routes);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

module.exports = app;