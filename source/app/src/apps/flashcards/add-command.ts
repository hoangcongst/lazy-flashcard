import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api"

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message|CallbackQuery): Promise<boolean> => {
    if ('data' in msg && msg.data) {
        const wordInput = msg.data.charAt(0) === '/' ? msg.data.substring(0, msg.data.indexOf(' ')) : msg.data
        await bot.sendMessage(chatId, `Added into flashcards`);
    }

    return true
}
