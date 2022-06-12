import { DynamoDB } from 'aws-sdk';
import { FlashCardRepository } from './flashcard-repository';

import { FlashCardItem } from './flashcard-item';

export class FlashCardDynamoClientRepository implements FlashCardRepository {

    docClient: DynamoDB.DocumentClient;

    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new DynamoDB.DocumentClient();
    }

    // Stores the given TodoItem in the DynamoDB Table specified.
    async putTodo(todoItem: FlashCardItem, table: string): Promise<void> {

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: table,
            Item: todoItem
        };

        console.log(`Storing record ${todoItem.id} in the ${table} Table.`);
        await this.docClient.put(params).promise();
        return;
    }

    // Fetches a TodoItem with an Id matching the requested id from DynamoDB.
    async getTodoById(id: string, table: string): Promise<FlashCardItem> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: table,
            Key: {
                "id": id
            }
        };

        console.log(`Fetching record ${id} from the ${table} Table.`);
        const result: DynamoDB.DocumentClient.GetItemOutput = await this.docClient.get(params).promise();
        return result.Item as FlashCardItem;
    }
}