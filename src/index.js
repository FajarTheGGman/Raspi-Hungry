//Copyright© 2021 By Fajar Firdaus

// Library i used
const app = require('./app');
const sapi = require('cowsay');
const chalk = require('chalk')
const loading = require("ora")
const colors = require('colors')
const figlet = require('figlet')
const jsome = require('jsome')
const sh = require("shelljs")
const fs = require("fs")

// Check raspberry pi IP/Hostname
sh.exec("hostname -I > host")

// Banner
console.log(chalk.bgBlue(figlet.textSync("Raspi Hungry", {
    font: 'Standard',
    width: 100
})))
console.log(chalk.bgYellow("           [ Control your raspberry from Android ]            "))

console.log(chalk.green(sapi.say({
    text: "Wellcome to raspi hungry dude...",
    e: "00",
    T: 'W'
})))

console.log(colors.rainbow("[----------------------------------]\n"))

jsome({
    "Coder": "FajarTheGGman",
    "Twitter": "@kernel024",
    "Instagram": "@Kernel024"
})

// Catch the IP/Hostname from file and add it to server

fs.readFile("./hostname", (err, ip) => {
const port = process.env.PORT || 5000;
app.listen(port, ip, () => {
  /* eslint-disable no-console */
    console.log(colors.rainbow("\n[----------------------------------]"))
    loading(chalk.yellow("[+] Server is online at : " + ip + ":" + port)).start()
  /* eslint-enable no-console */
});
})
