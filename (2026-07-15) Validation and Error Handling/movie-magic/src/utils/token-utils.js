import JSONWebToken from 'jsonwebtoken';

export function generateAuthToken ({ id, email }, expiresIn = '1h') {
    const authToken = JSONWebToken.sign(
        { id, email },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn }
    );

    return authToken;
}