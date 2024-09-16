import { reactionButtonsEvt } from "../types";
import { Interaction } from "discord.js";

export const handleReactionButtonInteraction = reactionButtonsEvt({
  event: "interactionCreate",
  listener: async ({ args, pluginData }) => {
    const interaction = args.interaction as Interaction;
    if (!interaction.isButton()) return;

    const config = pluginData.config.get();
    
    const channelConfig = config.reaction_buttons.channels.find(channel =>
      channel.buttons.some(button => button.label === interaction.customId)
    );

    if (!channelConfig) return;
    
    const buttonConfig = channelConfig.buttons.find(button => button.label === interaction.customId);

    if (!buttonConfig) return;

    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member) return;

    const role = interaction.guild?.roles.cache.get(buttonConfig.role_id);
    if (!role) return;

    if (!channelConfig.allow_multiple_roles) {
      const otherRoles = channelConfig.buttons
        .filter(button => button.role_id !== buttonConfig.role_id)
        .map(button => button.role_id);

      for (const otherRoleId of otherRoles) {
        if (member.roles.cache.has(otherRoleId)) {
          await member.roles.remove(otherRoleId);
        }
      }
    }

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      await interaction.reply({ content: `Removed role: <@&${role.id}>`, ephemeral: true });
    } else {
      await member.roles.add(role);
      await interaction.reply({ content: `Added role: <@&${role.id}>`, ephemeral: true });
    }
  },
});
