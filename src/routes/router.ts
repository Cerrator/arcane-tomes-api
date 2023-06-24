import express from "express";
import userRoutes from './users.route';

export default function initRouter(app: express.Application){
    app.use('/api/users', userRoutes);
}