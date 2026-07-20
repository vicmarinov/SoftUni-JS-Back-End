import JSONWebToken from 'jsonwebtoken';

export function generateAuthToken (userId, email, expiresIn = '1h') {
    const authToken = JSONWebToken.sign(
        {
            userId,
            email
        },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn }
    );

    return authToken;
}