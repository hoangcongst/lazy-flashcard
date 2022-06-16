import TelegramBot, { Message } from "node-telegram-bot-api"
import { FlashCardDynamoClientRepository } from "../../common/flashcard/flashcard-dynamoclient-repository"
import { FlashCardItem } from "../../common/flashcard/flashcard-item"
import { flashCardFluency } from "../constant/flashcard"
import { FLASHCARD_KEY } from "../constant/index-key"
import { translators } from "../constant/translators"
import { random } from "../utils"
import { formatMeaningPart } from "./translators/papago"

export const handler = async (bot: TelegramBot, userId: string, chatId: string, msg: Message): Promise<boolean> => {
    const flashcardRepository = new FlashCardDynamoClientRepository()

    const flashCards = await flashcardRepository.query("pk = :pk AND sk > :sk", {
        ":pk": FLASHCARD_KEY.CHAT + chatId,
        ":sk": FLASHCARD_KEY.CARD_ITEM + flashCardFluency.FLUENCY
    })

    if (flashCards) {
        const flashCard = flashCards[random(0, flashCards.length)] as unknown as FlashCardItem

        const dicts: Array<string> = []
        dicts.push(`\n<b><u>In:</u>${flashCard.input}</b>`)
        dicts.push(`<b><u>Out:</u>${flashCard.translatedText}</b>`)

        if (flashCard.engine === translators.PAPAGO) {
            dicts.push(...formatMeaningPart(flashCard.output))
        }

        await bot.sendMessage(chatId, dicts.join('\n'), {
            "disable_web_page_preview": true,
            "parse_mode": "HTML"
        });
    }

    return true
}
