import jwt from 'jsonwebtoken';

//this should be placed inside .env file
const SECRET = 'My_Secret_key';

//payload -> retruns obj
export function generateToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '1hr' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}