import { GuildPluginBlueprint } from "knub";
import { reactionButtonsPlugin } from "./ReactionButtons/plugin";

export const guildPlugins: Array<GuildPluginBlueprint<any, any>> = [reactionButtonsPlugin]
