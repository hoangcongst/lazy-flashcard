import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { LambdaApp } from '../apps/lambda-app';
import TelegramBot from 'node-telegram-bot-api'
import { FlashCardApp } from '../apps/flashcard';
import { FlashCardDynamoClientRepository } from '../common/flashcard/flashcard-dynamoclient-repository';

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const token = process.env['TELEGRAM_BOT_TOKEN']??'';
    const bot = new TelegramBot(token, { polling: false });
    const table: string = process.env['SAMPLE_TABLE']??'';
    const repository = new FlashCardDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new FlashCardApp(bot, table, repository);
    return await app.run(event);
};