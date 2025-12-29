# Sample discord.js bot using the Wheel of Names API

This is a simple app built with discord.js that uses the [Wheel of Names](https://wheelofnames.com) API to render wheel spins in response to a slash command.

## Getting started

In order to run this app, you'll need to set up your environment.

1. Install [Node.js (24+)](https://nodejs.org). I recommend using nvm or fnm for local development.
2. Create a copy of `.env.template` and name it `.env`.
3. Create a [Discord application](https://discord.com/developers/applications). Copy its application ID (found under "General information") and token (found under "Bot") into `.env`.
4. Create a [Wheel of Names API key](https://wheelofnames.com/api-doc). Copy it into `.env`.

Remember to run `npm run deploy-commands` whenever you update the `data` of any of your commands!

### Local development

5. Run `npm install` in this directory to install dependencies.
6. Run `npm run dev` in this directory to run the local development server.

#### Additional helpful scripts:

- Run `npm run check-types` to check the whole project for type errors.
- Run `npm run lint` to lint the whole project with `oxlint`.

### Production deployment

5. Upload this entire directory (except for `node_modules`) to your server.
6. Run `npm ci` in this directory to install dependencies.
7. Run `npm start` in this directory to run the production server.
