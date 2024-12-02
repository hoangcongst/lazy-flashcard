import { getData } from "./getData"
import { generateAnki } from "./generateAnki"
import { targets } from "./target-config"

const index = async () => {
    for (const [deckName, target] of Object.entries(targets)) {
        const data = await getData(target)
        generateAnki(deckName, data)
        if (data && data.length > 0)
            console.log(`Deck ${deckName} latest time is: ${data[data.length - 1][1].split('<hr>')[1]}`)
    }
}

index()