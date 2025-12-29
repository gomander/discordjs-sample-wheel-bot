import { env } from 'node:process';
import { REST, Routes } from 'discord.js';
import commands from './commands/index.ts';

const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = env;
if (!DISCORD_CLIENT_ID) throw Error('DISCORD_CLIENT_ID not set!');
if (!DISCORD_TOKEN) throw Error('DISCORD_TOKEN not set!');

const rest = new REST().setToken(DISCORD_TOKEN);

const body = Object.values(commands).map(({ data }) => data.toJSON());

console.log('Deploying commands...');

await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body });

console.log(`Successfully deployed ${body.length} commands!`);
