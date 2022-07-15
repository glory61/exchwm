const https = require('https')
const storage = require("node-sessionstorage");
const url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

function start()
{https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        data = JSON.parse(data);
        const coursePrivat24=(data[0].buy)
        storage.setItem('coursePrivat24', coursePrivat24);
        console.log(coursePrivat24)
    })}
)
}

module.exports.start=start
