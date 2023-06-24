import UsersModel from "../models/users.model";

const dbInit = () => {
    UsersModel.sync()
}

export default dbInit