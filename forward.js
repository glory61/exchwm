const https = require('https')
const storage = require("node-sessionstorage");
const url = "https://online.forward-bank.com:8082/api/v1/rates/card";

function start()
{https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        data = JSON.parse(data);
        const courseForward=(data[0].BuyRate)
        storage.setItem('courseForward', courseForward);
        console.log('Курс Forward: '+courseForward);
    })}
)
}
module.exports.startForward=start

