import { env } from 'node:process';
import { Client, Events, MessageFlags } from 'discord.js';
import commands from './commands/index.ts';

const { DISCORD_TOKEN } = env;

const client = new Client({ intents: [] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands[interaction.commandName];
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    console.log(`Received command "/${interaction.commandName}"`);
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.deferred && !interaction.replied) {
      await interaction.editReply(`There was an error while executing this command!\n${error}`);
    } else if (interaction.replied) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral
      });
    }
  }
});

client.login(DISCORD_TOKEN);
