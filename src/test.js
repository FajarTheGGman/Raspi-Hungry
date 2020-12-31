var x = require('fs')

x.readFile('./ip.txt', "utf8", (err,x) => {
    console.log(x)
})
