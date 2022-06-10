import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { TodoDynamoClientRepository } from '../common/todo-dynamoclient-repository';
import { LambdaApp } from '../apps/lambda-app';
import TelegramBot from 'node-telegram-bot-api'
import { CommandConfigApp } from '../apps/command-config-app';
/**
 * Sample Lambda function which creates an instance of a GetByIdApp and executes it.
 * The GetByIdApp evaluates the request path parameters and queries DynamoDB for the Id given.
 * 
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the TodoItem stored.
 * 
 */

export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const token = process.env['TELEGRAM_BOT_TOKEN']??'';
    const bot = new TelegramBot(token, { polling: false });
    const table: string = process.env['SAMPLE_TABLE']??'';
    const repository = new TodoDynamoClientRepository();

    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new CommandConfigApp(bot, table, repository);
    return await app.run(event);
};