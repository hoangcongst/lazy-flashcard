import TelegramBot, { Message } from "node-telegram-bot-api"
import { v4 as uuidv4 } from 'uuid';

export const handler = async (bot: TelegramBot, channelId: string, msg: Message): Promise<boolean> => {
    if (msg.text) {
        const wordInput = msg.text.charAt(0) === '/' ? msg.text.substring(0, msg.text.indexOf(' ')) : msg.text
        await bot.sendMessage(channelId, `/add_${uuidv4}\nPlease add input:`, {
            "reply_markup": {
                "force_reply": true
            }
        });
    }

    return true
}
