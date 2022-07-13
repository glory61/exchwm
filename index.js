const { Telegraf } = require('telegraf');
require('dotenv').config()
require('./privat24');
require('./scraper')
const a= require('./scraper')
const storage = require('node-sessionstorage');
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start( ctx => ctx.replyWithMarkdown(`
    Привет чорт на ${ctx.from.first_name}
    \nСредний курс ВМ: ` + `*` + storage.getItem('avg') +`*` + ' UAH'+
    '\nЗатраты: '+ `*` +storage.getItem('a')+ `*` + ' UAH'+
    `\nПолучено: `+ '*'+ (storage.getItem('income')) + '*'+ ' UAH'+
    '\nЗаработок: ' + '*' +storage.getItem('profit') +'*' +' UAH '+'*'+ '('+ a.relDiff(storage.getItem('a'), storage.getItem('income') ).slice(0,5)+ '%)'+'*' +
    '\n\nКурс привата: ' +'*' +storage.getItem('coursePrivat24') +'*' + ' UAH'

    )

)



bot.launch()
