import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api"
import { FlashCardDynamoClientRepository } from "../../common/flashcard/flashcard-dynamoclient-repository"
import { TranslateResultDynamoClientRepository } from "../../common/flashcard/translate-result-dynamoclient-repository"
import { flashCardFluency } from "../constant/flashcard"
import { FLASHCARD_KEY } from "../constant/index-key"
import { translators } from "../constant/translators"
import { generateKeyForWord } from "./translate-command"

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message|CallbackQuery): Promise<boolean> => {
    const flashcardRepository = new FlashCardDynamoClientRepository()

    if ('data' in msg && msg.data) {
        const translateResultRepository = new TranslateResultDynamoClientRepository()

        const wordInputs = msg.data.split(' ')
        const type = wordInputs[1]
        const pkTranslateResult = wordInputs[2]
        const result = await translateResultRepository.getById(pkTranslateResult)
        
        const skFlashCard = FLASHCARD_KEY.CARD_ITEM + generateKeyForWord(result.wordInput, type === 'all' ? translators.PAPAGO : translators.MANUAL, result.tarLangType)
        await flashcardRepository.putTodo({
            pk: FLASHCARD_KEY.CHAT + chatId,
            sk: skFlashCard, //md5 of word
            input: result.wordInput,
            output: type === 'all' ? result.tarDict : result.translatedText,
            engine: type === 'all' ? translators.PAPAGO : translators.MANUAL,
            fluency: flashCardFluency.REPEAT_NOW
        })

        await flashcardRepository.putTodo({
            pk: FLASHCARD_KEY.CHAT + chatId,
            sk: FLASHCARD_KEY.FLUENCY
        })

        await bot.sendMessage(chatId, `Added ${result.wordInput} into flashcards`);
    } else { // direct command

    }

    return true
}
