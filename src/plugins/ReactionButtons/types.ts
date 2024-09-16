import { z } from "zod";
import * as fs from "fs";
import { loadYamlSafely } from "../../utils/loadYamlSafely";
import { BasePluginType, guildPluginEventListener, guildPluginMessageCommand } from "knub";
import { ButtonStyle } from "discord.js";
import { hexToNumber, zSnowflake } from "../../utils";

const nullableString = z.string().nullable();
const nullableNumber = z.number().nullable();

const embedSchema = z.object({
  title: nullableString,
  description: nullableString,
  url: nullableString.optional(),
  timestamp: nullableString.optional(),
  color: z.union([z.string(), z.number()]).nullable().transform(val => typeof val === "string" ? hexToNumber(val) : val),
  footer: z.object({
    text: z.string(),
    icon_url: nullableString,
    proxy_icon_url: nullableString.optional(),
  }).nullable(),
  image: z.object({
    url: nullableString,
    proxy_url: nullableString.optional(),
    width: nullableNumber.optional(),
    height: nullableNumber.optional(),
  }).nullable(),
  thumbnail: z.object({
    url: nullableString,
    proxy_url: nullableString.optional(),
    width: nullableNumber.optional(),
    height: nullableNumber.optional(),
  }).nullable(),
  video: z.object({
    url: nullableString,
    width: nullableNumber.optional(),
    height: nullableNumber.optional(),
  }).nullable().optional(),
  provider: z.object({
    name: z.string(),
    url: nullableString.optional(),
  }).nullable().optional(),          
  fields: z.array(
    z.object({
      name: nullableString,
      value: nullableString,
      inline: z.boolean().nullable(),
    })
  ).nullable(),
  author: z.object({
    name: z.string(),
    url: nullableString.optional(),
    width: nullableNumber.optional(),
    height: nullableNumber.optional(),
  }).nullable(),
});

const buttonSchema = z.object({
  label: z.string(),
  emoji: z.string(),
  role_id: z.string(),
  style: z.enum(["PRIMARY", "SECONDARY", "SUCCESS", "DANGER"]).transform((val) => {
    switch (val) {
      case "PRIMARY":
        return ButtonStyle.Primary;
      case "SECONDARY":
        return ButtonStyle.Secondary;
      case "SUCCESS":
        return ButtonStyle.Success;
      case "DANGER":
        return ButtonStyle.Danger;
      default:
        return ButtonStyle.Primary;
    }
  }),
});

const channelSchema = z.object({
  channel_id: zSnowflake,
  message: z.string().optional(),
  embed: embedSchema.nullable(),
  allow_multiple_roles: z.boolean().optional().default(true),
  buttons: z.array(buttonSchema),
});

const configSchema = z.object({
  reaction_buttons: z.object({
    channels: z.array(channelSchema),
  }),
});

type ConfigSchema = z.infer<typeof configSchema>;

export function loadReactionButtonsConfig(): ConfigSchema {
  try {
    const yamlContent = fs.readFileSync("./config.yaml", "utf8");
    const parsedYaml = loadYamlSafely(yamlContent);
    return configSchema.parse(parsedYaml);
  } catch (error) {
    console.error("Error loading:", error);
    throw new Error("Failed to load");
  }
}

export interface ReactionButtonsPluginType extends BasePluginType {
  config: z.output<typeof configSchema>;
}

export const reactionButtoncmd = guildPluginMessageCommand<ReactionButtonsPluginType>();
export const reactionButtonsEvt = guildPluginEventListener<ReactionButtonsPluginType>();
