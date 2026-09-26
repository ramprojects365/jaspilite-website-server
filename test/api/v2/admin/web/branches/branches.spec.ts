import app from "../../../../../../minimart-server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";
import { request, expect } from "chai";

let token: string;
let branch_id: number;

describe("API - Branches", () => {

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
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email"]);
            token = res.body.payload.token;
        });
    });

    // Test get all Shops
    describe("1. Test if Get All Branches is working", () => {
        it("Should return list of branches summary", async () => {
            const res: Response = await request(app)
                .get("/api/v2/admin/web/branches")
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload.branches)
                .to.be.a('array')
            expect(res.body.payload.branches[0])
                .that.includes.all.keys(["branch_id", "branch_name", "latitude", "longitude", "landmark", "image"]);
        });
    });

    // // Test Get shops with user_id
    // describe("2. Test if Get shops of user_id is working", () => {
    //     it("Should return list of shops of that user", async () => {
    //         const res: Response = await request(app)
    //             .get("/api/v2/admin/web/shops?user_id=21")
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.shops)
    //             .to.be.a('array')
    //         expect(res.body.payload.shops[0])
    //             .that.includes.all.keys(["shop_id", "shop_name", "shop_addr"]);
    //     });
    // });

    // // Test insert new Shop
    // describe("3. Test if Insert New Shop is working", () => {
    //     it("Should return the newly added Shop", async () => {
    //         let shop = {
    //             "user_id": "21",
    //             "shop_name": "Shop1",
    //             "shop_addr": "Test Adder"
    //         }
    //         const res: Response = await request(app)
    //             .post("/api/v2/admin/web/shops")
    //             .set("Authorization", "Bearer " + token)
    //             .send(shop);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.shop)
    //             .that.includes.all.keys(["shop_id", "shop_name", "shop_addr"]);
    //         shop_id = res.body.payload.shop.shop_id;
    //     });
    // });

    // // Test patch existing Shop
    // describe("4. Test if Patch New Shop is working", () => {
    //     it("Should return the updated shop", async () => {
    //         let shop = {
    //             "shop_name": "Shop1",
    //             "shop_addr": "Test Adder" + Math.floor(Math.random() * 6)
    //         }
    //         const res: Response = await request(app)
    //             .patch("/api/v2/admin/web/shops/" + shop_id)
    //             .set("Authorization", "Bearer " + token)
    //             .send(shop);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.shop)
    //             .that.includes.all.keys(["shop_id", "shop_name", "shop_addr"]);
    //     });
    // });

    // // Test delete existing Shop
    // describe("5. Test if Delete Shop is working", () => {
    //     it("Should return the deleted shop ID", async () => {
    //         const res: Response = await request(app)
    //             .delete("/api/v2/admin/web/shops/" + shop_id)
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload)
    //             .that.includes.all.keys(["deleted_id"]);
    //     });
    // });

    // // Test Get count of shops
    describe("6. Test if get branches count works", () => {
        it("Should return the number of branches", async () => {
            const res: Response = await request(app)
                .get("/api/v2/admin/web/branches/count")
                .set("Authorization", "Bearer " + token);
            expect(res)
                .to.have.status(200)
                .to.be.a("object");
            expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            expect(res.body.payload)
                .that.includes.all.keys(["branch_count"]);
        });
    });
});

