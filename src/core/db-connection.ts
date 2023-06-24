import { Sequelize } from "sequelize";
import { config } from "../config/config";

export const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mariadb',
        logging: false
    }
)

export default sequelize;