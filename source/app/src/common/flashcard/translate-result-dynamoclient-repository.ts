import { DynamoDB } from 'aws-sdk';
import { TranslateResultItem } from './translate-result-item';
import { TranslateResultRepository } from './translate-result-repository';

export class TranslateResultDynamoClientRepository implements TranslateResultRepository {

    docClient: DynamoDB.DocumentClient;
    table: string;

    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new DynamoDB.DocumentClient();
        this.table = process.env.TB_TRANSLATE_RESULT??''
    }

    async put(result: TranslateResultItem): Promise<void> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.table,
            Item: result
        };

        console.log(`Storing record ${result.pk} in the ${this.table} Table.`);
        await this.docClient.put(params).promise();
        return;
    }

    async getById(id: string): Promise<TranslateResultItem> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.table,
            Key: {
                "pk": id
            }
        };

        console.log(`Fetching record ${id} from the ${this.table} Table.`);
        const result: DynamoDB.DocumentClient.GetItemOutput = await this.docClient.get(params).promise();
        return result.Item as TranslateResultItem;
    }
}