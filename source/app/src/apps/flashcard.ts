import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { LambdaApp } from './lambda-app';
import TelegramBot from 'node-telegram-bot-api';
import { FlashCardRepository } from '../common/flashcard/flashcard-repository';

export class FlashCardApp implements LambdaApp {
    table: string;
    repository: FlashCardRepository;
    bot: TelegramBot;

    constructor(bot: TelegramBot, table: string, repository: FlashCardRepository) {
        this.table = table;
        this.repository = repository;
        this.bot = bot;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        const msg = JSON.parse(event.body).message
        if (msg && msg.text) {
            if (!this.handleChangeTargetLanguage(msg.text.toString()))
                return { statusCode: 405 }
        } else {
            await this.bot.sendMessage("-665731905", "Please choose target language", {
                "reply_markup": {
                    "keyboard": [[{ text: "Vietnamese" }], [{ text: "Korean" }], [{ text: "English" }]]
                }
            });
        }
        return { statusCode: 200 }
    }

    handleChangeTargetLanguage(target: string): boolean {
        const validLangs = {
            'Vietnamese': 'vi',
            'Korean': 'ko',
            'English': 'en'
        }
        if (target in validLangs) {
            return true;
        }
        return false;
    }
}