import * as fs from 'fs'
import { stringify } from 'csv-stringify/sync';

export const generateAnki = async (deckName: string, data: string[][] | undefined) => {
    if (data) {
        // (C) CREATE CSV FILE
        const str = stringify(data);
        fs.writeFileSync(deckName + ".csv", str);
    }
}