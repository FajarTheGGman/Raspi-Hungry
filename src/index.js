const app = require('./app');
const sapi = require('cowsay');
const chalk = require('chalk')
const loading = require("ora")
const colors = require('colors')
const figlet = require('figlet')
const jsome = require('jsome')

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

const fs = require('fs')
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
    console.log(colors.rainbow("\n[----------------------------------]"))
    loading(chalk.yellow("[+] Server is online on port : " + port)).start()
  /* eslint-enable no-console */
});

