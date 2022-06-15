import { FlashCardItem } from "./flashcard-item";

export interface FlashCardRepository {
    putTodo(todoItem: FlashCardItem): Promise<void>;
    getTodoById(id: string): Promise<FlashCardItem>;
}