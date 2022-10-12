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
const startRaifffeisenOshad=require('./RaiffeisenOshad')
const storage = require('node-sessionstorage')
const bot =  new Telegraf('5509147073:AAEXS6sGMno2PHshp8n4X0mFrQPpjHEuAtI')
//5421165714:AAEdqNC8Xbs2-ZO7OsRdXltMQrm54jYpS8I для тестов
//5509147073:AAEXS6sGMno2PHshp8n4X0mFrQPpjHEuAtI основа

        bot.on('text', async (ctx) => {
            console.log(ctx.from.first_name, ctx.chat.id)
            await ctx.replyWithMarkdown(`Жди чорт на *${ctx.from.first_name}*...`)
            run.start();
            //startForward.startForward()
            await startRaifffeisenOshad.startRaiffeisenOshad()
            await delay(6000);
            a.run();
            try {
                const expense = ctx.message.text.replace(',', '.') * 1111.87
                const expenses = a.crop(expense, 2, 'floor')
                const formatData = `
            Курс WM: *${ctx.message.text}* UAH
Затраты: *${expenses}* UAH
           \nПолучено касса Privat: *${storage.getItem('income24')}* UAH
Получено касса Raiffeisen: *${storage.getItem('incomeRaiffeisen')}* UAH
Получено касса Oshad: *${storage.getItem('incomeOshad')}* UAH
\nЗаработок касса Privat *${a.crop(storage.getItem('income24')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('income24') ).slice(0,5)}%*)
Заработок касса Raiffeisen *${a.crop(storage.getItem('incomeRaiffeisen')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeRaiffeisen') ).slice(0,5)}%*)                  
Заработок касса Oshad *${a.crop(storage.getItem('incomeOshad')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeOshad') ).slice(0,5)}%*)                             
            \nКурс касса Privat: *${storage.getItem('coursePrivat24')}* UAH
Курс касса Raiffeisen: *${storage.getItem('courseRaiffeisen')}* UAH
Курс касса Oshad: *${storage.getItem('courseOshad')}* UAH
            `
                await ctx.replyWithMarkdown(formatData)
            } catch (e) {
                ctx.reply('Ошибка')
            }
        })


bot.launch()


//Получено Forward: *${storage.getItem('incomeForward')}* UAH
//Заработок Forward *${a.crop(storage.getItem('incomeForward')-expenses, 2, 'floor')}* UAH (*${a.relDiff(expenses, storage.getItem('incomeForward') ).slice(0,5)}%*)
//Курс Forward: *${storage.getItem('courseForward')}* UAH
