"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashCardDynamoClientRepository = void 0;
const aws_sdk_1 = require("aws-sdk");
class FlashCardDynamoClientRepository {
    constructor() {
        this.docClient = process.env.AWS_SAM_LOCAL ? new aws_sdk_1.DynamoDB.DocumentClient({
            endpoint: "http://host.docker.internal:12345"
        }) : new aws_sdk_1.DynamoDB.DocumentClient();
    }
    // Stores the given TodoItem in the DynamoDB Table specified.
    async putTodo(todoItem, table) {
        const params = {
            TableName: table,
            Item: todoItem
        };
        console.log(`Storing record ${todoItem.id} in the ${table} Table.`);
        await this.docClient.put(params).promise();
        return;
    }
    // Fetches a TodoItem with an Id matching the requested id from DynamoDB.
    async getTodoById(id, table) {
        const params = {
            TableName: table,
            Key: {
                "id": id
            }
        };
        console.log(`Fetching record ${id} from the ${table} Table.`);
        const result = await this.docClient.get(params).promise();
        return result.Item;
    }
}
exports.FlashCardDynamoClientRepository = FlashCardDynamoClientRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hjYXJkLWR5bmFtb2NsaWVudC1yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9mbGFzaGNhcmQvZmxhc2hjYXJkLWR5bmFtb2NsaWVudC1yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFtQztBQUtuQyxNQUFhLCtCQUErQjtJQUl4QztRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQVEsQ0FBQyxjQUFjLENBQUM7WUFDckUsUUFBUSxFQUFFLG1DQUFtQztTQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNkRBQTZEO0lBQzdELEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBdUIsRUFBRSxLQUFhO1FBRWhELE1BQU0sTUFBTSxHQUF5QztZQUNqRCxTQUFTLEVBQUUsS0FBSztZQUNoQixJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxDQUFDLEVBQUUsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0MsT0FBTztJQUNYLENBQUM7SUFFRCx5RUFBeUU7SUFDekUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUV2QyxNQUFNLE1BQU0sR0FBeUM7WUFDakQsU0FBUyxFQUFFLEtBQUs7WUFDaEIsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1g7U0FDSixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDOUQsTUFBTSxNQUFNLEdBQTBDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakcsT0FBTyxNQUFNLENBQUMsSUFBcUIsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUFyQ0QsMEVBcUNDIn0=