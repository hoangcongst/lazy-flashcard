export interface FlashCardItem {
    pk: string; //chatId
    sk: string; //md5 of word
    input: string;
    output: string;
    engine: number;
    fluency: number;
}