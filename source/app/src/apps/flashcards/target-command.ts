import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";

export const handler = async (bot: TelegramBot, channelId: string, msg: Message|CallbackQuery, isCallback = false): Promise<boolean> => {
    if (!isCallback) {
        await bot.sendMessage(channelId, "Please choose target language", {
            "reply_markup": {
                "inline_keyboard": [[{ text: "Vietnamese", callback_data: JSON.stringify({ "command": "/target", "val": "vi" }) }],
                [{ text: "Korean", callback_data: JSON.stringify({ "command": "/target", "val": "ko" }) }],
                [{ text: "English", callback_data: JSON.stringify({ "command": "/target", "val": "en" }) }]]
            }
        });
        return true
    }
    else {
        const callbackQuery = msg as CallbackQuery
        const targetLang = JSON.parse(callbackQuery.data??'').val 
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