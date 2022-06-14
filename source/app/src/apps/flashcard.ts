import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { LambdaApp } from './lambda-app';
import TelegramBot from 'node-telegram-bot-api';
import { FlashCardRepository } from '../common/flashcard/flashcard-repository';
import { handler as handlerTargetCommand } from './flashcards/target-command';
import { handler as handlerTranslateCommand } from './flashcards/translate-command';
import { handler as handlerAddFlashCard } from './flashcards/add-command';

export class FlashCardApp implements LambdaApp {
    table: string;
    repository: FlashCardRepository;
    bot: TelegramBot;
    handler: any;

    constructor(bot: TelegramBot, table: string, repository: FlashCardRepository) {
        this.table = table;
        this.repository = repository;
        this.bot = bot;
        this.handler = {
            '/target': handlerTargetCommand,
            '/translate': handlerTranslateCommand,
            '/a': handlerAddFlashCard
        }
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        try {
            const reqBody = JSON.parse(event.body)
            const msg = reqBody.message || reqBody.callback_query

            console.log(JSON.stringify(msg))

            const isCallbackQuery = msg.data !== undefined
            const chatId = msg.chat ? msg.chat.id : msg.message.chat.id
            let command = msg.data ? JSON.parse(msg.data).command : msg.text.split("@")[0]
            if (command.charAt(0) !== '/') command = '/translate'
            await this.handler[command](this.bot, chatId, msg, isCallbackQuery)
        } catch (error) {
            console.log(error)
        }

        return { statusCode: 200 }
    }
}