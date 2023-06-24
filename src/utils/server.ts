import express from "express";
import cors from "cors";
import helmet from "helmet";
import initRouter from "../routes/router"

const startServer = () => {
    const app = express();

    app.use((req, res, next) => {
        // Log request
        console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Rules of Api
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // Rutas
    initRouter(app)

    // Healthcheck
    app.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}));

    // Error handling
    app.use((req, res, next) => {
        const error = new Error('not found');
        console.error(error);
        return res.status(404).json({message: error.message});
    });

    return app;
}

export default startServer;