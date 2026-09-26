import app from "../../../../../../minimart-server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";
import { request, expect } from "chai";

let token: string;
let user_id: number;

describe("API - User", () => {

    // Test with Valid Email and Password
    describe("0. Get Valid tokens for testing", () => {
        it("Should return Token and admin user", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": "Sunoj@123"
            }
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload)
                .to.be.a("object")
                .that.includes.all.keys(["loggedIn", "token", "admin_user"]);
            expect(res.body.payload.admin_user)
                .to.be.a("object")
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
            token = res.body.payload.token;
        });
    });

    // Test get all Users
    describe("1. Test if Get All Users is working", () => {
        it("Should return list of users", async () => {
            const res: Response = await request(app)
                .get("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body.payload.users)
                .to.be.a('array')
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.users[0])
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });

    // Test Get shops with user_id
    describe("2. Test if Get user with particular id is working", () => {
        it("Should return summary of that particular user", async () => {
            const res: Response = await request(app)
                .get("/api/v2/admin/web/user?user_id=21")
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body.payload.users)
                .to.be.a('array')
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.users[0])
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });

    // Test insert new User
    describe("3. Test if Insert New User is working", () => {
        it("Should return the newly added User", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name",
                "email": "test@test.com",
                "password": "123"
            }
            const res: Response = await request(app)
                .post("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.admin_user)
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
            user_id = res.body.payload.admin_user.admin_id;
        });
    });

    // Test insert same User again
    describe("3. Test if Insert duplicate User is working", () => {
        it("Should return duplicate User error - 409", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name",
                "email": "test@test.com",
                "password": "123"
            }
            const res: Response = await request(app)
                .post("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res)
                .to.have.status(409)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
        });
    });

    // Test update existing user
    describe("5. Test if update user is working", () => {
        it("Should return the updated user", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name1",
                "email": "test@test.com",
                "password": "123"
            }
            const res: Response = await request(app)
                .patch("/api/v2/admin/web/user/" + user_id)
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.user)
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });

    // Test delete existing User
    describe("5. Test if Delete User is working", () => {
        it("Should return the deleted User ID", async () => {
            const res: Response = await request(app)
                .delete("/api/v2/admin/web/user/" + user_id)
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload)
                .that.includes.all.keys(["deleted_id"]);
        });
    });

});