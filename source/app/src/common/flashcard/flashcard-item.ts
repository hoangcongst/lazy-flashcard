export interface FlashCardItem {
    pk: string; //CHATID#chatId
    sk: string; //md5 of word
    input: string;
    output?: string;
    engine: number;
    fluency: number;
    translatedText?: string;
    created_at: string;
}