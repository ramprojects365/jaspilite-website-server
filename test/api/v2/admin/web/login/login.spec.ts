import app from "../../../../../../minimart-server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";
import { request, expect } from "chai";

describe("API - Login", () => {

    // Test with Valid Email and Password
    describe("1. Test with valid email and password", () => {
        it("Should return Token and admin user", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": "sunoj"
            }
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body.payload)
                .to.be.a("object")
                .that.includes.all.keys(["loggedIn", "token", "admin_user"]);
            expect(res.body.payload.admin_user)
                .to.be.a("object")
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email"]);
        });
    });

    // Test with No Email and Password Object
    describe("2. Test with no email and password objects", () => {
        it("Should return Error 400, Missing Body", async () => {
            let shop = {}
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(400)
                .to.be.a("object");
            expect(res.body)
                .to.be.a("object")
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.name)
                .to.equal("Missing Body");
            expect(res.body.message)
                .to.equal("Missing Data in Request Body");
        });
    });

    // Test with Empty Email
    describe("3. Test with empty email", () => {
        it("Should return Error 404, Login Error", async () => {
            let shop = {
                "email": "",
                "password": "sunoj"
            }
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(404)
                .to.be.a("object");
            expect(res.body)
                .to.be.a("object")
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.name)
                .to.equal("Login Error");
            expect(res.body.message)
                .to.equal("The user id or password cannot be empty.");
        });
    });

    // Test with Empty Password
    describe("4. Test with empty password", () => {
        it("Should return Error 404, Login Error", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": ""
            }
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(404)
                .to.be.a("object");
            expect(res.body)
                .to.be.a("object")
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.name)
                .to.equal("Login Error");
            expect(res.body.message)
                .to.equal("The user id or password cannot be empty.");
        });
    });
    // Test with Empty Email and Password
    describe("5. Test with empty email and password", () => {
        it("Should return Error 404, Login Error", async () => {
            let shop = {
                "email": "",
                "password": ""
            }
            const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
            expect(res)
                .to.have.status(404)
                .to.be.a("object");
            expect(res.body)
                .to.be.a("object")
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.name)
                .to.equal("Login Error");
            expect(res.body.message)
                .to.equal("The user id or password cannot be empty.");
        });
    });
});


