const fs = require('fs')
const sh = require('shelljs')

fs.watchFile('/var/log/auth.log', (current, previous) => {
    fs.readFile("/var/log/auth.log", "utf8", (err, data) => {
        fs.writeFile("./tools/honeypot/auth.log", data, "utf8", (err) => {
            sh.exec("bash ./tools/honeypot/check.sh")
        })
    })
})
