import { guildPlugin } from "knub";
import { loadReactionButtonsConfig } from "./types";
import { handleReactionButtonInteraction } from "./events/HandleReactionButtons";
import { sendReactionButtons } from "./events/SendReactionButtons";
import { ReactionButtonsPluginType } from "./types";

export const reactionButtonsPlugin = guildPlugin<ReactionButtonsPluginType>()({
  name: "reaction_buttons",
  configParser: loadReactionButtonsConfig, 
  events: [handleReactionButtonInteraction], 

  async afterLoad(pluginData) {
    await sendReactionButtons(pluginData);
  },
});
