import supertest from "supertest";
import startServer from "../utils/server";

const app = startServer();

describe('user', () => {
    describe('login', () => {
        describe('given the user does not exist', () => {
            it("should return a 404", async () => {
                const body = {
                    email: "user-123",
                    password: "123456"
                }
                await supertest(app).post(`/api/users/login`).send(body).expect(404)
            });
        });
        describe('given the password is incorrect', () => {
            it("should return a 401", async () => {
                const body = {
                    email: "alejandrocerrato@gmail.com",
                    password: "123456"
                }
                await supertest(app).post(`/api/users/login`).send(body).expect(401)
            });
        });
        describe('given the user is correct', () => {
            it("should return a 200 with accesstoken", async () => {
                const body = {
                    email: "alejandrocerrato@gmail.com",
                    password: "patihome2022"
                }
                await supertest(app).post(`/api/users/login`).send(body).expect(200)
            })
        })
    });
})
