import {UsersModel, IUser } from "../models/users.model"

const createUser = (user: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        UsersModel.create(user)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    });
}

const getUserByEmail = (email: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        UsersModel.findOne({where: {email: email}})
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

const updatePassword = (user: IUser) => {
    return new Promise((resolve, reject) => {
        UsersModel.update({password: user.password}, {where: {email: user.email}})
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

const deleteUserByEmail = (email: string) => {
    return new Promise((resolve, reject) => {
        UsersModel.destroy({where: {email: email}})
        .then(result => {

            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default { createUser, getUserByEmail, updatePassword,  deleteUserByEmail}