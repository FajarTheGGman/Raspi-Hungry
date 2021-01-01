// Copyright© 2020 By Fajar Firdaus

// Library i used
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const sh = require('shelljs');
const fs = require('fs');
const yosay = require('yosay')

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(cors());


// Honeypot functions to check access log
function honeypot(){
fs.watchFile('/var/log/auth.log', (current, previous) => {
    fs.readFile("/var/log/auth.log", "utf8", (err, data) => {
        fs.writeFile("./tools/honeypot/auth.log", data, "utf8", (err) => {
            sh.exec("bash ./tools/honeypot/check.sh")
        })
    })
})

}

// Function to check the raspi temperature
function temperature(){
    sh.exec("bash ./tools/temperature/read.sh")
}


// Function to generate command to terminal from app
app.get("/terminal", (req,res) => {
    var x = req.query.command;
    var process = sh.exec(x, {silent: true})
    if(x){
        res.json({ "hasil" : process })
    }else{
        fs.createReadStream(__dirname + "/view/terminal.html").pipe(res)
    }
})


// Route to turn on the vncserver
app.get("/vnc", (req,res) => {
    var process = sh.exec("bash ./tools/vnc.sh", {silent: true})
    res.json({ "result": "vncserver successfully enabled" })
})

// Just a banner
app.get('/banner', (req,res) => {
    fs.createReadStream(__dirname + "/view/banner.png").pipe(res)
})

// index view
app.get('/', (req, res) => {
    fs.createReadStream(__dirname + "/view/index.html").pipe(res)
})

// route to turn on the honeypot
app.get('/honeypot', (req,res) => {
    honeypot()
    res.json({ "status": "[+] Honeypot is on" })
})

// route to check honeypot access log
app.get('/honeylog', (req,res) => {
    fs.readFile('./tools/honeypot/warning', "utf8", (err, data) => {
        res.json({ "result": data })
    })
})

// route to shutdown the raspberry pi
app.get("/shutdown", (req,res) => {
    res.json({ "status": "raspberry pi will shutdown in second" })
    sh.exec('sudo shutdown now')
})

// route to check the server connection
app.get('/connection', (req,res) => {
    res.json({ "status": "200 OK" })
})

// route for network mapper
app.get('/nmap', (req,res) => {
    var nmap = sh.exec("nmap " + req.query.ip ,{ silent: true })
    res.json({ result: nmap })
})

// route for check the raspberry pi temperature
app.get("/temp", (req,res) => {
    temperature();

    fs.readFile("./tools/temperature/temp.log", "utf8", (err, data) => {
        res.json({ "hasil": data })
    })
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
