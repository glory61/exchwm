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
const startRaifffeisen=require('./raiffeisen')
const storage = require('node-sessionstorage')
const bot =  new Telegraf('5509147073:AAEXS6sGMno2PHshp8n4X0mFrQPpjHEuAtI')



        bot.on('text', async (ctx) => {
            console.log(ctx.from.first_name, ctx.chat.id)
            await ctx.replyWithMarkdown(`Жди чорт на *${ctx.from.first_name}*...`)
            run.start();
            startForward.startForward()
            await startRaifffeisen.startRaiffeisen()
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
Получено касса Raiffeisen: *${storage.getItem('incomeRaiffeisen')}* UAH
\nЗаработок Privat *${a.crop(storage.getItem('income24')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('income24') ).slice(0,5)}%*)
Заработок Forward *${a.crop(storage.getItem('incomeForward')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeForward') ).slice(0,5)}%*)
Заработок касса Raiffeisen *${a.crop(storage.getItem('incomeRaiffeisen')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeRaiffeisen') ).slice(0,5)}%*)                  
            \nКурс Privat: *${storage.getItem('coursePrivat24')}* UAH
Курс Forward: *${storage.getItem('courseForward')}* UAH
Курс касса Raiffeisen: *${storage.getItem('courseRaiffeisen')}* UAH
            `
                await ctx.replyWithMarkdown(formatData)
            } catch (e) {
                ctx.reply('Ошибка')
            }


        })


bot.launch()



