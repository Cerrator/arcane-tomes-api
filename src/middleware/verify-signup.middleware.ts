import { NextFunction, Request, Response } from "express";
import usersService from "../services/users.service";
import { validationResult } from "express-validator";

const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    usersService.getUserByEmail(email).then(user => {
        if (user) {
            res.status(410).send({message: 'Error! Ese email ya está registrado'});
            return
        }
        next();
    })
    .catch(error => {
        res.status(500).send({message: error});
            return
    });
}

export default checkDuplicateEmail