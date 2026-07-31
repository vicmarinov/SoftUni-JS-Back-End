import JSONWebToken from 'jsonwebtoken';

export function generateAuthToken ({ id, email }, expiresIn = '1h') {
    const payload = { id, email };
    const secret = process.env.JSON_WEB_TOKEN_SECRET;

    const token = JSONWebToken.sign(payload, secret, { expiresIn });
    return token;
}