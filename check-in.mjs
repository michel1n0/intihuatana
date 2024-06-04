import AWS from 'aws-sdk';
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    console.log('check-in.handler fue llamada...');
    const timestamp = new Date().toISOString();
    const { userId } = JSON.parse(event.body);

    const params = {
        TableName: process.env.COMPLETED_ATTENDANCE_TABLE,
        Item: {
            userId: userId,
            checkInTime: timestamp,
        },
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Check-in recorded', timestamp }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error recording check-in', error: error.message }),
        };
    }
};
