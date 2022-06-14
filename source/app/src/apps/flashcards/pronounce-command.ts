import TelegramBot, { CallbackQuery } from "node-telegram-bot-api"
import { TranslateResultDynamoClientRepository } from "../../common/flashcard/translate-result-dynamoclient-repository";
import { getAudioLink } from "./pronounce/papago";

export const handler = async (bot: TelegramBot, channelId: string, msg: CallbackQuery): Promise<boolean> => {
    if (msg.data) {
        const wordInputs = msg.data.split(' ')
        const type = wordInputs[1]
        const primaryKey = wordInputs[2]
        const translateResultRepository = new TranslateResultDynamoClientRepository()
        const result = await translateResultRepository.getById(primaryKey)
        const input = type === 'in' ? result.wordInput : result.translatedText;
        const audioLink = await getAudioLink(input, type === 'in' ? result.srcLangType : result.tarLangType)

        if (audioLink)
            await bot.sendAudio(channelId, audioLink, {
                "caption": input
            });
    }

    return true
}



