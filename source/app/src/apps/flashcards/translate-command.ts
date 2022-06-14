import TelegramBot, { Message } from "node-telegram-bot-api"
import { translators } from "../constant/translators"
import { translate } from "./translators/papago"
import { TranslateResultDynamoClientRepository } from "../../common/flashcard/translate-result-dynamoclient-repository";
import { MD5 } from "crypto-js";

export const handler = async (bot: TelegramBot, channelId: string, msg: Message): Promise<boolean> => {
    if (msg.text) {
        const wordInput = msg.text.charAt(0) === '/' ? msg.text.substring(0, msg.text.indexOf(' ')) : msg.text
        const translateResult = await translate(wordInput)

        const translateResultRepository = new TranslateResultDynamoClientRepository()
        const key = MD5(`${wordInput}_${translators['PAPAGO']}_${'en'}`).toString()
        translateResult.raw['pk'] = key
        translateResult.raw['wordInput'] = wordInput
        translateResultRepository.put(translateResult.raw)

        await bot.sendMessage(channelId, translateResult.formattedText, {
            "reply_markup": {
                "inline_keyboard": [[
                    { text: `${'\u{1F50A}'} In`, callback_data: `/p in ${key}` },
                    { text: `${'\u{1F50A}'} Out`, callback_data: `/p out ${key}` },
                    {
                        text: `${'\u{2764}'} Meaning`, callback_data: `/a ${key}`
                    },
                    {
                        text: `${'\u{2764}'} All`, callback_data: `/a ${key}`
                    }
                ]]
            },
            "disable_web_page_preview": true,
            "parse_mode": "HTML"
        });
    }

    return true
}



