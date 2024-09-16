# Rolebuttons

A Discord bot similar to zeppelin that allows users to react to messages with buttons to receive roles. The bot supports role-based buttons, embed messages, and single or multiple role assignments.

## Features

- Add reaction buttons to messages that allow users to receive or remove roles.
- Supports message embeds.
- Option to limit users to only one role from a set of buttons.
- Fully configurable using YAML files.

## Installation

1. **Clone the repository**

   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/todiscord/rolebuttons.git
   ```

2. **Install dependencies**

Navigate into the project folder and install the required dependencies by: `npm install`

3. **Configuration**

   Rename `.env.example` to `.env` and configure the following:
   ```bash
   BOT_TOKEN=your_discord_bot_token
   DEFAULT_PREFIX=!
   ALLOWED_GUILDS=your_guild_id
   ```

Edit the `config.yaml` file to define your reaction buttons, embeds, and role assignments (explained below).
to run use `npm run prestart`.

### Configuration Options

#### **`reaction_buttons`**
- **`channels`**: A list of channels where the bot will post the reaction buttons.
  - **`channel_id`**: The ID of the channel where the buttons will be posted.
  - **`message`** *(optional)*: A text message to send above the buttons.
  - **`allow_multiple_roles`**: Set to `false` to allow only one role from the button set, or `true` to allow multiple.
  - **`embed`** *(optional)*: The embed configuration for the message.
    - **`title`**: The title of the embed.
    - **`description`**: The description of the embed.
    - **`color`**: The color of the embed in hex format (e.g., `#00FF00`).
    - **`footer`** *(optional)*:
      - **`text`**: The text in the footer.
      - **`icon_url`**: The URL of the icon in the footer.
    - **`image`** *(optional)*:
      - **`url`**: The URL of the image to include in the embed.
    - **`thumbnail`** *(optional)*:
      - **`url`**: The URL of the thumbnail image.
    - **`fields`** *(optional)*: A list of fields to include in the embed.
      - **`name`**: The name of the field.
      - **`value`**: The value of the field.
      - **`inline`**: Whether the field should display inline (true/false).
    - **`author`** *(optional)*:
      - **`name`**: The name of the author.
      - **`url`**: A URL associated with the author.
  - **`buttons`**: A list of buttons that users can click to receive roles.
    - **`label`**: The text that appears on the button.
    - **`emoji`**: The emoji that appears on the button.
    - **`role_id`**: The ID of the role to assign or remove when the button is clicked.
    - **`style`**: The button style. Can be `PRIMARY`, `SECONDARY`, `SUCCESS` or `DANGER`.

### Button Styles
Here are the available styles for buttons:
- **`PRIMARY`**: Blue button
- **`SECONDARY`**: Grey button
- **`SUCCESS`**: Green button
- **`DANGER`**: Red button
