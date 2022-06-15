import TelegramBot, { CallbackQuery } from "node-telegram-bot-api"
import { TranslateResultDynamoClientRepository } from "../../common/flashcard/translate-result-dynamoclient-repository";
import { formatMeaningPart } from "./translators/papago";

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: CallbackQuery): Promise<boolean> => {
    if (msg.data) {
        const translateResultRepository = new TranslateResultDynamoClientRepository()
        const result = await translateResultRepository.getById(msg.data.split(' ')[1])

        const dicts: Array<string> = []
        dicts.push(`\n<b><u>In:</u>${result.translatedText}</b>`)
        dicts.push(...formatMeaningPart(result.tarDict))

        await bot.sendMessage(chatId, dicts.join('\n'), {
            "disable_web_page_preview": true,
            "parse_mode": "HTML"
        });
    }

    return true
}


