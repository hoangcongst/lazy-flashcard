import { TranslateResultItem } from "./translate-result-item";

export interface TranslateResultRepository {
    put(result: TranslateResultItem): Promise<void>;
    getById(id: string): Promise<TranslateResultItem>;
}