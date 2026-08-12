import JSONWebToken from 'jsonwebtoken';

export function generateAuthToken ({ id, email }, expiresIn = '1h') {
    const secret = process.env.JSON_WEB_TOKEN_SECRET || 'default_secret';
    const payload = { id, email };
    
    const token = JSONWebToken.sign(payload, secret, { expiresIn });
    return token;
}