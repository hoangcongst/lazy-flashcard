import TelegramBot, { Message } from "node-telegram-bot-api"
import { translators, voiceReader } from "../constant/translators"
import { translate } from "./translators/papago"
import { TranslateResultDynamoClientRepository } from "../../common/flashcard/translate-result-dynamoclient-repository";
import { MD5 } from "crypto-js";
import { UserDynamoClientRepository } from "../../common/flashcard/user-dynamoclient-repository";
import { USER_KEY } from "../constant/user-key";

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message): Promise<boolean> => {
    if (msg.text) {
        const translateResultRepository = new TranslateResultDynamoClientRepository()
        const userRepository = new UserDynamoClientRepository();
        const targetLang = (await userRepository.getById(userId, USER_KEY.TARGET + chatId)).target ?? 'en'
        const wordInput = msg.text.charAt(0) === '/' ? msg.text.substring(0, msg.text.indexOf(' ')) : msg.text
        const translateResult = await translate(wordInput, targetLang)

        const key = MD5(`${wordInput}_${translators['PAPAGO']}_${targetLang}`).toString()

        translateResult.raw['pk'] = key
        translateResult.raw['wordInput'] = wordInput
        translateResultRepository.put(translateResult.raw)

        await bot.sendMessage(chatId, translateResult.formattedText, {
            "reply_markup": {
                "inline_keyboard": [getListKeyboards(key, translateResult.raw.srcLangType, targetLang)]
            },
            "disable_web_page_preview": true,
            "parse_mode": "HTML"
        });
    }

    return true
}

const getListKeyboards = (key: string, inputLang: string, targetLang: string) => {
    const listInputKeyboards = [
        {
            text: `${'\u{2764}'} Meaning`, callback_data: `/a meaning ${key}`
        },
        {
            text: `${'\u{2764}'} All`, callback_data: `/a all ${key}`
        }
    ]
    if (voiceReader[inputLang as keyof typeof voiceReader]) listInputKeyboards.push({ text: `${'\u{1F50A}'} In`, callback_data: `/p in ${key}` })
    if (voiceReader[targetLang as keyof typeof voiceReader]) listInputKeyboards.push({ text: `${'\u{1F50A}'} Out`, callback_data: `/p out ${key}` })
    return listInputKeyboards
}



