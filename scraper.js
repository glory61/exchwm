function crop(number, digits, type){
    const _digits = Number(1 + Array(digits).fill(0).join(''))
    if (type === 'ceil') return Math.ceil(number * _digits) / _digits
    if (type === 'floor') return Math.floor(number * _digits) / _digits
}
function relDiff(a, b) {
    if (a < b)
        return '+' + [a - b === 0 ? 0 : 100 * Math.abs((a - b) / b)   +'%' || 'input error'];
    else
        return '-' +[ a - b === 0 ? 0 : 100 * Math.abs((a - b) / b) +'%' || 'input error'];
}
require('./privat24');
require('./forward')
const storage = require("node-sessionstorage");



function runscrape(){



    const income24 = storage.getItem('coursePrivat24')*1000
    const incomeForward =storage.getItem('courseForward')*1000
    const income1 =crop(income24, 2, 'floor')
    storage.setItem('income24', income1);
    storage.setItem('incomeForward', incomeForward)

    }

module.exports.relDiff= relDiff;
module.exports.run=runscrape;
module.exports.crop=crop;

