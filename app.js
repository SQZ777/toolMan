import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import getChangedIp from './ipDetect/app.js'
import fs from 'fs';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(async () => {
    const changedIp = await getChangedIp();

    if (changedIp !== false) {
      console.log(`${new Date} IP 變更了 \`${changedIp}\``);
      try {
        const channel = client.channels.cache.get('1202057374018584586');
        await channel.send(`IP 變更: \`${changedIp}:8211\``);
      } catch (error) {
        console.log(`訊息送出失敗 錯誤訊息: ${error}`);
      }
    }
    fs.writeFileSync('D://repos/toolMan/log.txt', new Date().toString());
  }, 5000);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);
