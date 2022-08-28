const puppeteer = require('puppeteer');
const storage = require("node-sessionstorage");

async function run() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({'Accept-Language': 'en-US,en;q=0.9'})
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    await page.goto('https://kurs.com.ua/bank/98-rayffayzen_bank');
    const courseRaiffeisen = await page.$$eval('#organization_table_cash > table > tbody > tr:nth-child(2) > td:nth-child(3) > div', courses => {
        return courses.map(anchor => anchor.textContent.substr(0,6).trim())
    })
    await page.waitForTimeout(500);
    storage.setItem('courseRaiffeisen', courseRaiffeisen );
    await browser.close();
    console.log('Курс Raiffeisen: '+courseRaiffeisen)
}
module.exports.startRaiffeisen=run
