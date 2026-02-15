import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
  AttachmentBuilder
} from 'discord.js';
import { getSpinAnimation } from '../wheel-of-names-api-util.ts';

export default {
  data: new SlashCommandBuilder()
    .setName('spin')
    .setDescription('Spins a wheel with the Wheel of Names API')
    .addStringOption((option) =>
      option
        .setName('texts')
        .setDescription('The texts you want on the wheel, separated by commas')
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const texts = interaction.options.getString('texts');
    if (!texts) throw Error('You must include at least one text!');
    await interaction.deferReply();
    const { animation, imageFormat, winner } = await getSpinAnimation(
      texts.split(',').map((text) => text.trim())
    );
    const file = new AttachmentBuilder(animation, { name: `wheel.${imageFormat}` });
    await interaction.editReply({
      content: `The winner is: ${winner.text}`,
      files: [file]
    });
  }
};
