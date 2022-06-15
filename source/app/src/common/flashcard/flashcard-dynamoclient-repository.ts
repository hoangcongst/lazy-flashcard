import { DynamoDB } from 'aws-sdk';
import { FlashCardRepository } from './flashcard-repository';

import { FlashCardItem } from './flashcard-item';

export class FlashCardDynamoClientRepository implements FlashCardRepository {

    docClient: DynamoDB.DocumentClient;
    table: string

    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new DynamoDB.DocumentClient();
        this.table = process.env.TB_FLASHCARD??''
    }

    // Stores the given TodoItem in the DynamoDB Table specified.
    async putTodo(todoItem: FlashCardItem): Promise<void> {

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.table,
            Item: todoItem
        };

        console.log(`Storing record ${todoItem.pk} in the ${this.table} Table.`);
        await this.docClient.put(params).promise();
    }

    // Fetches a TodoItem with an Id matching the requested id from DynamoDB.
    async getTodoById(pk: string): Promise<FlashCardItem> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.table,
            Key: {
                "pk": pk
            }
        };

        console.log(`Fetching record ${pk} from the ${this.table} Table.`);
        const result: DynamoDB.DocumentClient.GetItemOutput = await this.docClient.get(params).promise();
        return result.Item as FlashCardItem;
    }
}