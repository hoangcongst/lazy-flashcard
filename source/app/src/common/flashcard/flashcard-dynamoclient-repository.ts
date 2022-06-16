import { DynamoDB } from 'aws-sdk';
import { FlashCardRepository } from './flashcard-repository';

import { FlashCardItem } from './flashcard-item';
import { ItemList, KeyExpression } from 'aws-sdk/clients/dynamodb';

export class FlashCardDynamoClientRepository implements FlashCardRepository {

    docClient: DynamoDB.DocumentClient;
    table: string

    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new DynamoDB.DocumentClient();
        this.table = process.env.TB_FLASHCARD ?? ''
    }

    async put(todoItem: FlashCardItem): Promise<void> {

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.table,
            Item: todoItem
        };

        console.log(`Storing record ${todoItem.pk} in the ${this.table} Table.`);
        await this.docClient.put(params).promise();
    }

    async getById(pk: string): Promise<FlashCardItem> {
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

    async query(keyConditionExpression: KeyExpression, expressionAttributeValues: any, limit?: number): Promise<ItemList | undefined> {
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: this.table,
            KeyConditionExpression: keyConditionExpression,
            //there is a fucking stupid bug here when I use ExpressionAttributeValueMap
            ExpressionAttributeValues: expressionAttributeValues,
        };

        if (limit) params.Limit = limit
        const result: DynamoDB.DocumentClient.QueryOutput = await this.docClient.query(params).promise();
        return result.Items;
    }
}