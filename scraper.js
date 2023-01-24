const storage = require("node-sessionstorage");
function crop(number, digits, type){
    const _digits = Number(1 + Array(digits).fill(0).join(''))
    return type === 'ceil' ? Math.ceil(number * _digits) / _digits : Math.floor(number * _digits) / _digits
}

function relDiff(a, b) {
    const diff = (a - b) / b;
    return diff === 0 ? 0 : (diff > 0 ? '-' : '+') + Math.abs(diff * 100) + '%';
}

function run() {
    const incomeRaiffeisen = storage.getItem('courseRaiffeisen') * 1000;
    const income24 = storage.getItem('coursePrivat24') * 1000;
    const incomeForward = storage.getItem('courseForward') * 1000;
    const incomeOshad = storage.getItem('courseOshad') * 1000;

    const income1 = crop(income24, 2, 'floor');
    storage.setItem('income24', income1);
    storage.setItem('incomeForward', incomeForward);
    storage.setItem('incomeRaiffeisen', incomeRaiffeisen);
    storage.setItem('incomeOshad', incomeOshad);
}

module.exports = {
    relDiff,
    run,
    crop
};
