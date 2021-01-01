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

function honeypot(){
fs.watchFile('/var/log/auth.log', (current, previous) => {
    fs.readFile("/var/log/auth.log", "utf8", (err, data) => {
        fs.writeFile("./tools/honeypot/auth.log", data, "utf8", (err) => {
            sh.exec("bash ./tools/honeypot/check.sh")
        })
    })
})

}

function temperature(){
    sh.exec("bash ./tools/temperature/read.sh")
}

app.get("/terminal", (req,res) => {
    var x = req.query.command;
    var process = sh.exec(x, {silent: true})
    if(x){
        res.json({ "hasil" : process })
    }else{
        fs.createReadStream(__dirname + "/view/terminal.html").pipe(res)
    }
})

app.get("/vnc", (req,res) => {
    var process = sh.exec("bash ./tools/vnc.sh", {silent: true})
    res.json({ "result": "vncserver successfully enabled" })
})

app.get('/banner', (req,res) => {
    fs.createReadStream(__dirname + "/view/banner.png").pipe(res)
})

app.get('/', (req, res) => {
    fs.createReadStream(__dirname + "/view/index.html").pipe(res)
})

app.get('/honeypot', (req,res) => {
    honeypot()
    res.json({ "status": "[+] Honeypot is on" })
})

app.get('/honeylog', (req,res) => {
    fs.readFile('./tools/honeypot/warning', "utf8", (err, data) => {
        res.json({ "result": data })
    })
})

app.get("/shutdown", (req,res) => {
    res.json({ "status": "raspberry pi will shutdown in second" })
    sh.exec('sudo shutdown now')
})

app.get('/connection', (req,res) => {
    res.json({ "status": "200 OK" })
})

app.get('/nmap', (req,res) => {
    var nmap = sh.exec("nmap " + req.query.ip ,{ silent: true })
    res.json({ result: nmap })
})

app.get("/temp", (req,res) => {
    temperature();

    fs.readFile("./tools/temperature/temp.log", "utf8", (err, data) => {
        res.json({ "hasil": data })
    })
})

app.get("/terminal/jquery", (req,res) => {
    fs.createReadStream(__dirname + "/assets/jquery.js").pipe(res)
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
