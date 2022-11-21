import { Bot } from 'grammy';
import { argv } from 'node:process'

const tokenArgName = '--token=';
const tokenArg = argv.find(arg => arg.indexOf(tokenArgName) === 0)

let token = '';

if (tokenArg) {
  token = tokenArg.substring(tokenArgName.length, tokenArg.length)
} else {
  throw new Error("Provide token using `--token=123456:tokenexample` argument")
}

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
    try {
        const res = await fetch('https://api.ipify.org').then(res => res.text());
        ctx.reply("your ip address is " + res);
    } catch (error) {
        console.log(error);
        if (error.message) {
            ctx.reply(error.message);
        } else {
            ctx.reply(JSON.stringify(error))
        }
    }
})

bot.start();