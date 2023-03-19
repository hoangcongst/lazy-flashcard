import AWS from "aws-sdk";
import { FLASHCARD_KEY } from "../src/apps/constant/index-key";
import { translators } from "../src/apps/constant/translators";
import { formatMeaningPart } from "../src/apps/flashcards/translators/papago";
import { FlashCardDynamoClientRepository } from "../src/common/flashcard/flashcard-dynamoclient-repository";
import { FlashCardItem } from "../src/common/flashcard/flashcard-item";

AWS.config.update({ region: 'ap-southeast-1' });

export const getData = async (target: string) => {
    const repository = new FlashCardDynamoClientRepository();
    const flashCardsFromDB = await repository.query("pk = :pk", "created_at > :time", { // OR attribute_not_exists(created_at)", {
        ":pk": FLASHCARD_KEY.CHAT + target.toString(),
        ":time": process.env.LAST_IMPORT
    })
    if (flashCardsFromDB) {
        const flashCards = []
        for (const flashCardItem of flashCardsFromDB) {
            const flashCard = flashCardItem as unknown as FlashCardItem
            const dicts: Array<string> = []
            dicts.push(`<b>${flashCard.translatedText}</b>`)

            if (flashCard.engine === translators.PAPAGO) {
                dicts.push(...formatMeaningPart(flashCard.output))
            }
            dicts.push('<hr>' + flashCard.created_at)
            flashCards.push([
                `<b>${flashCard.input}</b>`,
                dicts.join('<br>')
            ])
        }
        
        return flashCards
    }
}


