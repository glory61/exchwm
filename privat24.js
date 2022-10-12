const https = require('https')
const storage = require("node-sessionstorage");
const url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5";

function start()
{https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        data = JSON.parse(data);
        const coursePrivat24=(data[1].buy)
        storage.setItem('coursePrivat24', coursePrivat24);
        console.log('Курс Privat: '+coursePrivat24);
    })}
)
}

module.exports.start=start
