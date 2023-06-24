import { check } from "express-validator";

export const registrateValidation = [
    check('username', 'username is required').not().isEmpty().isLength({min: 3}).withMessage('username must be at least 3 characters long'),
    check('email', 'email is required').not().isEmpty().isEmail().withMessage('email is invalid'),
    check('password', 'password is required').not().isEmpty()
        .isLength({min: 8}).withMessage('password must be at least 8 characters long')
        .isAlphanumeric().withMessage('password must contain at least one number and letters')
        .matches(/[a-z]/)
        .withMessage('password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('password must contain at least one uppercase letter'),
    check('confirmPassword', 'confirmPassword is required').not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
]

export const passwordValidation = [
    check('password', 'password is required').not().isEmpty()
        .isLength({min: 8}).withMessage('password must be at least 8 characters long')
        .isAlphanumeric().withMessage('password must contain at least one number and letters')
        .matches(/[a-z]/)
        .withMessage('password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('password must contain at least one uppercase letter')
]