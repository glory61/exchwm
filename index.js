const { Telegraf } = require('telegraf');
require('dotenv').config()
function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
const a= require('./scraper')
const run=require('./privat24')
const startForward =require('./forward')
const storage = require('node-sessionstorage');
const bot =  new Telegraf(process.env.BOT_TOKEN)

        bot.on('text', async (ctx) => {
            await ctx.replyWithMarkdown(`Жди чорт на *${ctx.from.first_name}*...`)
            run.start();
            startForward.startForward()
            await delay(6000);
            a.run();
            try {
                const expense = ctx.message.text.replace(',', '.') * 1111.87
                const expenses = a.crop(expense, 2, 'floor')
                const formatData = `
            Курс WM: *${ctx.message.text}* UAH
Затраты: *${expenses}* UAH
            \nПолучено Privat: *${storage.getItem('income24')}* UAH
Получено Forward: *${storage.getItem('incomeForward')}* UAH
\nЗаработок Privat *${a.crop(storage.getItem('income24')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('income24') ).slice(0,5)}%*)
Заработок Forward *${a.crop(storage.getItem('incomeForward')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeForward') ).slice(0,5)}%*)
            \nКурс Privat: *${storage.getItem('coursePrivat24')}* UAH
Курс Forward: *${storage.getItem('courseForward')}* UAH
            `
                await ctx.replyWithMarkdown(formatData)
            } catch (e) {
                ctx.reply('Ошибка')
            }

        })


bot.launch()



