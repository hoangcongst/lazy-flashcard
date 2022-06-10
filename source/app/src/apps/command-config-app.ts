import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { TodoRepository } from '../common/todo-repository';
import { LambdaApp } from './lambda-app';
import TelegramBot from 'node-telegram-bot-api';

export class CommandConfigApp implements LambdaApp {
    table: string;
    repository: TodoRepository;
    bot: TelegramBot;

    constructor(bot: TelegramBot, table: string, repository: TodoRepository) {
        this.table = table;
        this.repository = repository;
        this.bot = bot;
    }

    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        this.bot.onText(/\/target/, (msg: TelegramBot.Message) => {
            if (msg && msg.text) {
                if (!this.handleChangeTargetLanguage(msg.text.toString()))
                    return { statusCode: 405 }
            } else {
                this.bot.sendMessage(msg.chat.id, "Please choose target language", {
                    "reply_markup": {
                        "keyboard": [[{ text: "Vietnamese" }], [{ text: "Korean" }], [{ text: "English" }]]
                    }
                });
            }
        });
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