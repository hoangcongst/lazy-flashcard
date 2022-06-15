import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { LambdaApp } from './lambda-app';
import TelegramBot from 'node-telegram-bot-api';
import { FlashCardRepository } from '../common/flashcard/flashcard-repository';
import { handler as handlerTargetCommand } from './flashcards/target-command';
import { handler as handlerTranslateCommand } from './flashcards/translate-command';
import { handler as handlerPronounce } from './flashcards/pronounce-command';
import { handler as handlerAddFlashCard } from './flashcards/add-command';
import { handler as handlerStart } from './flashcards/start-command';
import { handler as handlerInverse } from './flashcards/inverse-command';

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
            '/a': handlerAddFlashCard,
            '/p': handlerPronounce,
            '/start': handlerStart,
            '/inverse': handlerInverse
        }
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        try {
            console.log(event.body)
            const reqBody = JSON.parse(event.body)
            const msg = reqBody.message || reqBody.callback_query
            
            if(!msg) throw event.body

            const isCallbackQuery = msg.data !== undefined
            const chatId = msg.chat ? msg.chat.id : msg.message.chat.id
            const userId = msg.from.id

            let command = msg.data ? msg.data.substring(0, msg.data.indexOf(' ')) : msg.text?.split("@")[0]
            if(msg.group_chat_created) command = '/start'
            else if (command.charAt(0) !== '/') command = '/translate'

            console.log(command)
            await this.handler[command](this.bot, userId, chatId, msg, isCallbackQuery)
        } catch (error) {
            console.log(error)
        }

        return { statusCode: 200 }
    }
}