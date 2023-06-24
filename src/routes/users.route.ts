import express from "express";
import controller from "../controllers/users.controller";
import checkDuplicateEmail from "../middleware/verify-signup.middleware";
import { passwordValidation, registrateValidation } from "../middleware/field-validator.middleware";
import verifyToken from "../middleware/auth-validator.middleware";

const router = express.Router()

router.post('/register', registrateValidation, checkDuplicateEmail, controller.register);
router.post('/login', controller.login);
router.post('/change-password', passwordValidation,controller.changePassword);
router.delete('/delete-account', verifyToken, controller.deleteUser);

export = router;