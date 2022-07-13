const puppeteer = require('puppeteer');
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
const b = require('./privat24');
const storage = require("node-sessionstorage");

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({'Accept-Language': 'en-US,en;q=0.9'})
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    await page.goto('https://exchanger.money/cards/home/wmz/uah', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.waitForSelector("#sell-bids-table > div > div > div > table > tbody > tr > td.text-primary.text-center");

   // const data = await page.evaluate(() => document.querySelector('*').outerHTML)
    //console.log(data);
    const price = await page.$$eval('#sell-bids-table > div > div > div > table > tbody > tr > td.text-primary.text-center', courses => {

        //courses.querySelector('#sell-bids-table > div > div:nth-child(3) > div.col-sm-7 > div > ul > li:nth-child(2) > a').click()

        return courses.map(anchor => anchor.textContent.trim().replace('UAH', "").replace(' ', ""))

    })
    await page.waitForTimeout(3000);
    console.log(price);

    const avg = Object.values(price).reduce((a, c) => a + c/10, 0);
    const avg1= crop(avg, 2, 'floor')
    console.log(avg);
    const expenses = 1112*avg
    const a= crop(expenses, 2, 'floor')
    const income = storage.getItem('coursePrivat24')*1000
    const income1 =crop(income, 2, 'floor')
    const profit = income-expenses
    const profitt =crop(profit, 2, 'floor')

    storage.setItem('profit', profitt);
    storage.setItem('income', income1);
    storage.setItem('a', a)
    storage.setItem('avg', avg1)
    console.log('\nСредний курс ВМ: ' +  storage.getItem('avg') + ' UAH'+
    '\nЗатраты: '+ storage.getItem('a')+ ' UAH'+
    `\nПолучено: `+ storage.getItem('income') + ' UAH'+
    '\nЗаработок: ' + storage.getItem('profit') + ' UAH'+
    '\n\nКурс привата: ' +storage.getItem('coursePrivat24') + ' UAH');
    // const result = await page.evaluate(() => {
      //  let wmz = document.querySelector('tr:nth-child(1) > td:nth-child(1)').innerHTML;
    //   let uah = document.querySelector('td:nth-child(2)').innerHTML;
    //     let course = document.querySelector('td.text-primary.text-center').innerHTML;
    //      return {
    //         wmz,
    //         uah,
    //         course
    //     }
    //    return result; });
    //   console.log(result);

    await browser.close();
})()
module.exports.relDiff= relDiff;
