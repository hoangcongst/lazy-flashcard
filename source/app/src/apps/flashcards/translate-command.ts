import TelegramBot, { Message } from "node-telegram-bot-api"
import { translators } from "../constant/translators"
import { translate } from "./translators/papago"
import { v4 as uuidv4 } from 'uuid';

export const handler = async (bot: TelegramBot, channelId: string, msg: Message): Promise<boolean> => {
    if (msg.text) {
        const wordInput = msg.text.charAt(0) === '/' ? msg.text.substring(0, msg.text.indexOf(' ')) : msg.text
        const translateResult = await translate(wordInput)
        const tempUUID = uuidv4().toString()

        await bot.sendMessage(channelId, translateResult.formattedText, {
            "reply_markup": {
                "inline_keyboard": [[
                    { text: "Pronounce Input", callback_data: `/pronounce ${tempUUID}` },
                    { text: "Pronounce Output", callback_data: `/pronounce ${tempUUID}` },
                    {
                        text: "Add Only Meaning", callback_data: `/add ${tempUUID}`
                    },
                    {
                        text: "Add Flashcard", callback_data: `/add ${tempUUID}`
                    }
                ]]
            },
            "disable_web_page_preview": true,
            "parse_mode": "HTML"
        });
    }

    return true
}



