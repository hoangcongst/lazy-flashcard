import { FlashCardItem } from "./flashcard-item";

export interface FlashCardRepository {
    put(todoItem: FlashCardItem): Promise<void>;
    getById(id: string): Promise<FlashCardItem>;
}