"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const flashcard_1 = require("../apps/flashcard");
const flashcard_dynamoclient_repository_1 = require("../common/flashcard/flashcard-dynamoclient-repository");
const handler = async (event) => {
    var _a, _b;
    const token = (_a = process.env['TELEGRAM_BOT_TOKEN']) !== null && _a !== void 0 ? _a : '';
    const bot = new node_telegram_bot_api_1.default(token, { polling: false });
    const table = (_b = process.env['SAMPLE_TABLE']) !== null && _b !== void 0 ? _b : '';
    const repository = new flashcard_dynamoclient_repository_1.FlashCardDynamoClientRepository();
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app = new flashcard_1.FlashCardApp(bot, table, repository);
    return await app.run(event);
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hjYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL2ZsYXNoY2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxrRkFBK0M7QUFDL0MsaURBQWlEO0FBQ2pELDZHQUF3RztBQUVqRyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBK0IsRUFBRTs7SUFDakYsTUFBTSxLQUFLLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLG1DQUFFLEVBQUUsQ0FBQztJQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkQsTUFBTSxLQUFLLEdBQVcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtQ0FBRSxFQUFFLENBQUM7SUFDdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxtRUFBK0IsRUFBRSxDQUFDO0lBRXpELHdHQUF3RztJQUN4RyxNQUFNLEdBQUcsR0FBYyxJQUFJLHdCQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxPQUFPLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFUVyxRQUFBLE9BQU8sV0FTbEIifQ==