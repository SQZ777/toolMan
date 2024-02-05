import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import getChangedIp from './ipDetect/app.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  setInterval(async () => {
    const changedIp = await getChangedIp();
    if (changedIp !== false) {
      console.log(`${new Date} IP 變更了 \`${changedIp}\``);
      try {
        const channel = client.channels.cache.get('1202057374018584586');
        channel.send(`IP 變更: \`${changedIp}\``);
      } catch (error) {
        console.log(`訊息送出失敗 錯誤訊息: ${error}`);
      }
    }
  }, 5000);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);
