import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";

export const handler = async (bot: TelegramBot, channelId: string, msg: Message | CallbackQuery, isCallback = false): Promise<boolean> => {
    await bot.sendMessage(channelId, "Thank you for your supporting my pet project, please touch to /target to set target language!");
    return true;
}
