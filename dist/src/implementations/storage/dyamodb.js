"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBDataStorage = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const storage_1 = require("../../interfaces/storage");
class DynamoDBDataStorage extends storage_1.DataStorage {
    dynamoDBClient;
    tableName;
    constructor({ tableName, region }) {
        super();
        this.tableName = tableName;
        const client = new client_dynamodb_1.DynamoDBClient({ region: region || 'us-west-2' });
        this.dynamoDBClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    getName() {
        return 'aws-dynamodb';
    }
    async handleGet(input) {
        try {
            const command = new lib_dynamodb_1.GetCommand({
                TableName: this.tableName,
                Key: { id: input.key },
            });
            const response = await this.dynamoDBClient.send(command);
            if (!response.Item) {
                return { exists: false };
            }
            const data = response.Item.value;
            return { exists: true, data };
        }
        catch (error) {
            return { exists: false };
        }
    }
    async handleSet(input) {
        const command = new lib_dynamodb_1.PutCommand({
            TableName: this.tableName,
            Item: {
                id: input.key,
                value: input.value,
            },
        });
        await this.dynamoDBClient.send(command);
        return { key: input.key };
    }
}
exports.DynamoDBDataStorage = DynamoDBDataStorage;
//# sourceMappingURL=dyamodb.js.map