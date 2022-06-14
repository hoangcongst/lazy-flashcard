import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { UserDynamoClientRepository } from "../../common/flashcard/user-dynamoclient-repository";

export const handler = async (bot: TelegramBot, channelId: string, msg: Message|CallbackQuery, isCallback = false): Promise<boolean> => {
    if (!isCallback) {
        await bot.sendMessage(channelId, "Please choose target language", {
            "reply_markup": {
                "inline_keyboard": [[{ text: "Vietnamese", callback_data: '/target vi' }],
                [{ text: "Korean", callback_data: '/target ko' }],
                [{ text: "English", callback_data: '/target en' }]]
            }
        });
        return true
    }
    else {
        const userRepository = new UserDynamoClientRepository();
        const callbackQuery = msg as CallbackQuery
        const targetLang = callbackQuery.data?.split(' ')[1]??'en'
        const messageId = callbackQuery.message?.message_id
        const result = setTargetLang(channelId, userRepository, targetLang)
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: channelId, message_id: messageId })
        return result
    }
}

const setTargetLang = (channelId: string, repository: UserDynamoClientRepository, targetLang: string): boolean => {
    const validLangs = ['vi', 'ko', 'en']
    if (validLangs.includes(targetLang)) {
        const config = {
            pk: channelId.toString(),
            fk: 'settingTarget',
            target: targetLang
        }
        repository.put(config)
        return true;
    }
    return false;
}