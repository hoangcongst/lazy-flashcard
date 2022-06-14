import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";

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
        const callbackQuery = msg as CallbackQuery
        const targetLang = callbackQuery.data?.split(' ')[1]??'en'
        const messageId = callbackQuery.message?.message_id
        const result = setTargetLang(targetLang)
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: channelId, message_id: messageId })
        return result
    }
}

const setTargetLang = (targetLang: string): boolean => {
    const validLangs = ['vi', 'ko', 'en']
    if (validLangs.includes(targetLang)) {
        return true;
    }
    return false;
}