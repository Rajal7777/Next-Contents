import jwt from 'jsonwebtoken';

//this should be placed inside .env file
const SECRET = 'My_Secret_key';

//payload -> retruns obj
export function generateToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '1hr' });
}

//decode the JWT / checks if the signature is valid{some one modified the token}/ checks expiration
export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}