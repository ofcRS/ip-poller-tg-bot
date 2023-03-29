import { Bot } from 'grammy';
import { argv } from 'node:process';

const tokenArgName = '--token=';
const tokenArg = argv.find(arg => arg.startsWith(tokenArgName));

if (!tokenArg) {
  throw new Error("Provide token using `--token=123456:tokenexample` argument");
}

const token = tokenArg.substring(tokenArgName.length);

async function startBot() {
  const bot = new Bot(token);

  bot.on('message:text', async (ctx) => {
    try {
      const res = await fetch('https://api.ipify.org');
      if (!res.ok) {
        throw new Error('Failed to fetch IP address');
      }
      const ip = await res.text();
      await ctx.reply(`Your IP address is ${ip}`);
    } catch (error) {
      console.error('Error has occurred', error);
      const errorMessage = error.message || JSON.stringify(error);
      await ctx.reply(errorMessage);
    }
  });

  try {
    await bot.start();
  } catch (error) {
    console.error('Failed to start bot', error);
    setTimeout(startBot, 5000);
  }
}

startBot();