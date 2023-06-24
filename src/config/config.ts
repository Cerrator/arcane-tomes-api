import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT= process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DATABASE = process.env.DB_DATABASE || '';

const SERVER_TOKEN_EXPIRETIME = 3600;
const SERVER_REFRESH_TOKEN_EXPIRETIME = 86400;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';


export const config = {
    server: {
        port: SERVER_PORT,
        token: {
            expireTime: SERVER_TOKEN_EXPIRETIME,
            refreshTime: SERVER_REFRESH_TOKEN_EXPIRETIME,
            issuer: SERVER_TOKEN_ISSUER,
            secret: SERVER_TOKEN_SECRET
        }
    },
    db: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    }
}