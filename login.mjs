import AWS from 'aws-sdk';
const cognito = new AWS.CognitoIdentityServiceProvider();

export const handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: 'your_cognito_app_client_id',
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };

    try {
        const response = await cognito.initiateAuth(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful', token: response.AuthenticationResult.IdToken }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Login failed', error: error.message }),
        };
    }
};
