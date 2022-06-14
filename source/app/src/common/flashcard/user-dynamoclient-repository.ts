import { DynamoDB } from 'aws-sdk';
import { User } from './user-item';

export class UserDynamoClientRepository {

    docClient: DynamoDB.DocumentClient;
    table: string;

    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new DynamoDB.DocumentClient();
        this.table = process.env.TB_TRANSLATE_RESULT??''
    }

    async put(result: User): Promise<void> {
        
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.table,
            Item: result
        };

        console.log(`Storing record ${result.pk} in the ${this.table} Table.`);
        await this.docClient.put(params).promise();
        return;
    }

    async getById(pk: string, fk: string): Promise<User> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.table,
            Key: {
                "pk": pk.toString()            }
        };
        const result: DynamoDB.DocumentClient.GetItemOutput = await this.docClient.get(params).promise();
        return result.Item as User;
    }
}