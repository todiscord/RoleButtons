import { GuildPluginData } from "knub";
import { ActionRowBuilder, ButtonBuilder, TextChannel, EmbedBuilder } from "discord.js";
import { ReactionButtonsPluginType } from "../types";

export async function sendReactionButtons(pluginData: GuildPluginData<ReactionButtonsPluginType>) {
  const config = pluginData.config.get();
  const { channels } = config.reaction_buttons;

  for (const channelConfig of channels) {
    const channel = pluginData.client.channels.cache.get(channelConfig.channel_id) as TextChannel;
    if (!channel || !channel.isTextBased()) {
      continue;
    }

    let embed;
    if (channelConfig.embed) {
      embed = new EmbedBuilder();
      
      if (channelConfig.embed.title) embed.setTitle(channelConfig.embed.title);
      if (channelConfig.embed.description) embed.setDescription(channelConfig.embed.description);
      if (channelConfig.embed.url) embed.setURL(channelConfig.embed.url);
      if (channelConfig.embed.timestamp) embed.setTimestamp(new Date(channelConfig.embed.timestamp));
      if (channelConfig.embed.color) embed.setColor(channelConfig.embed.color);

      if (channelConfig.embed.footer) {
        embed.setFooter({
          text: channelConfig.embed.footer.text,
          iconURL: channelConfig.embed.footer.icon_url || undefined,
        });
      }

      if (channelConfig.embed.image?.url) {
        embed.setImage(channelConfig.embed.image.url);
      }

      if (channelConfig.embed.thumbnail?.url) {
        embed.setThumbnail(channelConfig.embed.thumbnail.url);
      }

      if (channelConfig.embed.fields) {
        embed.addFields(
          channelConfig.embed.fields.map(field => ({
            name: field.name || '',
            value: field.value || '',
            inline: field.inline || false,
          }))
        );
      }

      if (channelConfig.embed.author) {
        embed.setAuthor({
          name: channelConfig.embed.author.name,
          url: channelConfig.embed.author.url || undefined,
        });
      }
    }

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      ...channelConfig.buttons.map((buttonConfig) => {
        return new ButtonBuilder()
          .setCustomId(buttonConfig.label)
          .setLabel(buttonConfig.label)
          .setEmoji(buttonConfig.emoji)
          .setStyle(buttonConfig.style);
      })
    );

    try {
      const sentMessage = await channel.send({
        content: channelConfig.message || undefined,
        embeds: embed ? [embed] : [],
        components: [row],
      });

      console.log("Sent message with buttons:", sentMessage.id);
    } catch (error) {
      console.error("Error creating button", error);
    }
  }
}
