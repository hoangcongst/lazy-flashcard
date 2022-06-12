import { FlashCardItem } from "./flashcard-item";

export interface FlashCardRepository {
    putTodo(todoItem: FlashCardItem, table: string): Promise<void>;
    getTodoById(id: string, table: string): Promise<FlashCardItem>;
}