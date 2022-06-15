import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { UserDynamoClientRepository } from "../../common/flashcard/user-dynamoclient-repository";
import { USER_KEY } from "../constant/user-key";

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message | CallbackQuery, isCallback = false): Promise<boolean> => {
    const userRepository = new UserDynamoClientRepository()
    userRepository.put({
        pk: userId.toString(),
        sk: USER_KEY.INFO,
        name: msg.from?.first_name + ' ' + msg.from?.last_name,
        username: msg.from?.username
    })

    await bot.sendMessage(chatId, "Thank you for your supporting my pet project, please touch to /target to set target language!");
    return true;
}
