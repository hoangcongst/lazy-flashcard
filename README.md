```cd source/app && npm run compile```\
```cd source && sam local start-api --env-vars env.json```

To build and deploy your application for the first time, run the following in your shell:

```bash
cd source && rm -rf .aws-sam/
sam build
sam deploy --guided
```

- https://betterprogramming.pub/aws-sam-setting-local-serverless-development-with-lambda-and-dynamodb-5b4c7375f813

**DynamoDB**
- https://medium.com/@ratulsaha/how-to-model-amazon-dynamodb-databases-with-nosql-workbench-bdb1bdbb6fcc
- To using Dynamo local GUI
```
sudo npm install -g dynamodb-admin
DYNAMO_ENDPOINT=http://localhost:12345 dynamodb-admin
```

### Export Anki flashCards
1. Change `.env` LAST_TIME configuration to the newest flashcard's time
2. Run `cd source/app && npm run export-anki`
3. In Anki when import files. Setting `Field separator` to `Comma`, `Note type` to `Basic` and change to the right deck