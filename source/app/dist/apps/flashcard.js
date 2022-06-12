"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashCardApp = void 0;
class FlashCardApp {
    constructor(bot, table, repository) {
        this.table = table;
        this.repository = repository;
        this.bot = bot;
    }
    async run(event) {
        const msg = JSON.parse(event.body).message;
        // if (msg && msg.text) {
        //     if (!this.handleChangeTargetLanguage(msg.text.toString()))
        //         return { statusCode: 405 }
        // } else {
        console.log(this.bot);
        await this.bot.sendMessage("-665731905", "Please choose target language", {
            "reply_markup": {
                "keyboard": [[{ text: "Vietnamese" }], [{ text: "Korean" }], [{ text: "English" }]]
            }
        });
        // }
        return { statusCode: 200 };
    }
    handleChangeTargetLanguage(target) {
        const validLangs = {
            'Vietnamese': 'vi',
            'Korean': 'ko',
            'English': 'en'
        };
        if (target in validLangs) {
            return true;
        }
        return false;
    }
}
exports.FlashCardApp = FlashCardApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hjYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcHMvZmxhc2hjYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLE1BQWEsWUFBWTtJQUtyQixZQUFZLEdBQWdCLEVBQUUsS0FBYSxFQUFFLFVBQStCO1FBQ3hFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQXNCO1FBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUMxQyx5QkFBeUI7UUFDekIsaUVBQWlFO1FBQ2pFLHFDQUFxQztRQUNyQyxXQUFXO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsK0JBQStCLEVBQUU7WUFDdEUsY0FBYyxFQUFFO2dCQUNaLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO1NBQ0osQ0FBQyxDQUFDO1FBQ1AsSUFBSTtRQUNKLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUVELDBCQUEwQixDQUFDLE1BQWM7UUFDckMsTUFBTSxVQUFVLEdBQUc7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUE7UUFDRCxJQUFJLE1BQU0sSUFBSSxVQUFVLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQXRDRCxvQ0FzQ0MifQ==