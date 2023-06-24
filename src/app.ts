import startServer from "./utils/server";
import http from "http";
import dbInit from "./core/db-init";
import { config } from "./config/config";

const app = startServer();
dbInit()
http.createServer(app).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));