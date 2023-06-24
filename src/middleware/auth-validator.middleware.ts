import { NextFunction, Response } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { config } from "../config/config";
import { AuthenticatedRequest } from "../interfaces/utils.interface";

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({
            code: 401,
            message: 'Acceso denegado'
        });
    }

    const token = authorizationHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, config.server.token.secret);
        req.user = verified
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send({ message: 'Acceso denegado! El token ha expirado!' });
        }
        if (error instanceof JsonWebTokenError) {
            return res.status(401).send({ message: 'Acceso denegado! El token no es válido!' });
        }
        return res.status(401).json({
            code: 401,
            error: error.message
        })
    }
}

export default verifyToken;