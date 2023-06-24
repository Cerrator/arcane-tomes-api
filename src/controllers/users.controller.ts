import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {config}  from "../config/config";
import { Request, Response } from "express";
import usersService from "../services/users.service";
import { IUser } from "../models/users.model";
import { AuthenticatedRequest } from "../interfaces/utils.interface";

const maxAge: number = 3 * 24 * 60 * 60;

const register = async (req: Request, res: Response) => {
    try {
        let { email, username, password } = req.body;

        bcryptjs.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError,
                });
            }
            const user: IUser = {
                email: email,
                username: username,
                password: hash
            }
            usersService.createUser(user)
                .then((result) => {
                    res.status(200).json({
                        code: 200,
                        message: "Usuario registrado correctamente!",
                        user: result,
                    });
                })
                .catch((err) => {
                    console.error("Error en la creación de usuario");
                    console.error({
                        message: err.sqlMessage,
                        query: err.sql,
                    });
                    res.status(410).json({
                        code: 410, // Código de error (usuario ya existe)
                        error: err.sqlMessage,
                    });
                });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            code: 500,
            error: "Error en la conexión a la base de datos",
        });
    }
}

const login = (req: Request, res: Response) => {
    let { email, password } = req.body;
    usersService.getUserByEmail(email)
    .then((user) => {
        if (!user) {
            return res.status(404).json({
                code: 404,
                error: 'No existe ese usuario.',
            });
        }
        return bcryptjs
            .compare(password, user.password)
            .then((result) => {
                if (!result) {
                    return res.status(401).json({
                        code: 401,
                        error: "Contraseña errónea",
                    });
                }

                const token = jwt.sign(
                    { email: user.email },
                    config.server.token.secret,
                    { expiresIn: maxAge / 3 }
                );

                res.status(200).send({
                    code: 200,
                    message: "Usuario logueado correctamente!",
                    accessToken: token,
                });
            })
            .catch((error) => {
                console.error("Error al comparar contraseñas:", error)
            });
    });
}

const changePassword = (req: Request, res: Response) => {
    let { email, password } = req.body;
    usersService.getUserByEmail(email)
    .then((user) => {
        if (!user) {
            return res.status(404).json({
                code: 404,
                error: 'No existe ese usuario.',
            });
        }
        bcryptjs.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError,
                });
            }
            const user: IUser = {
                email: email,
                password: hash
            }
            usersService.updatePassword(user)
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Contraseña actualizada correctamente!"
                });
            })
            .catch((err) => {
                console.error("Error en la creación de usuario");
                console.error({
                    message: err.sqlMessage,
                    query: err.sql,
                });
                res.status(410).json({
                    code: 410, // Código de error (usuario ya existe)
                    error: err.sqlMessage,
                });
            });
        });
    });
}

const deleteUser = (req: AuthenticatedRequest, res: Response) => {
    try {
        let { email } = req.user;
        usersService.deleteUserByEmail(email)
        .then(result => {
            if (result === 0) {
                res.status(404).json({
                    code: 404,
                    error: `No existe usuario con email ${email}`,
                });
                throw new Error(`No existe usuario con email ${email}`)
            }
            res.status(200).json({
                code: 200,
                message: "Usuario eliminado!"
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: error
        });
    }
}
export default { register, login, changePassword, deleteUser };