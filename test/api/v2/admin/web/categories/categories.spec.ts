import app from "../../../../../../minimart-server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";
import { request, expect } from "chai";

let token: string;
let category_id: number;

describe("API - Categories", () => {

    // Test with Valid Email and Password
    describe("0. Get Valid tokens for testing", () => {
        it("Should return Token and admin user", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": "sunoj"
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

    // Test get all Categories
    describe("1. Test if Get All Categories is working", () => {
        it("Should return list of categories", async () => {
            const res: Response = await request(app)
                .get("/api/v2/admin/web/categories")
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body.payload.categories)
                .to.be.a('array')
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.categories[0])
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
        });
    });

    // Test insert new Category
    describe("3. Test if Insert New category is working", () => {
        it("Should return the newly added category", async () => {
            let category = {
                "category_name": "Test Category",
                "category_icon": "FontAwsomeIcons.heart"
            }
            const res: Response = await request(app)
                .post("/api/v2/admin/web/categories")
                .set("Authorization", "Bearer " + token)
                .send(category);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.category)
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
            category_id = res.body.payload.category.category_id;
        });
    });

    // Test update existing category
    describe("5. Test if update category is working", () => {
        it("Should return the updated category", async () => {
            let category = {
                "category_name": "Test Category1",
                "category_icon": "FontAwsomeIcons.heart"
            }
            const res: Response = await request(app)
                .patch("/api/v2/admin/web/categories/" + category_id)
                .set("Authorization", "Bearer " + token)
                .send(category);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.category)
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
        });
    });

    // Test delete existing User
    describe("5. Test if Delete category is working", () => {
        it("Should return the deleted category ID", async () => {
            const res: Response = await request(app)
                .delete("/api/v2/admin/web/categories/" + category_id)
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