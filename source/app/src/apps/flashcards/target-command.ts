import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { UserDynamoClientRepository } from "../../common/flashcard/user-dynamoclient-repository";
import { USER_KEY } from "../constant/user-key";

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message|CallbackQuery, isCallback = false): Promise<boolean> => {
    console.log(msg)
    if (!isCallback) {
        await bot.sendMessage(chatId, "Please choose target language", {
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
        const result = setTargetLang(userId, chatId, userRepository, targetLang)
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId })
        await bot.editMessageText("Finished setting target language! Let's type new word to see its meaning", { chat_id: chatId, message_id: messageId })
        return result
    }
}

const setTargetLang = (userId: string, chatId: string, repository: UserDynamoClientRepository, targetLang: string): boolean => {
    const validLangs = ['vi', 'ko', 'en']
    if (validLangs.includes(targetLang)) {
        const config = {
            pk: userId.toString(),
            sk: USER_KEY.TARGET + chatId,
            target: targetLang
        }
        repository.put(config)
        return true;
    }
    return false;
}