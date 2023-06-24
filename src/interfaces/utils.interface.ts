import { IUser } from "../models/users.model";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: IUser;
}