import app from "../../../../../../minimart-server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { Response } from "superagent";
import { request, expect } from "chai";

let token: string;
let product_id: number;

describe("API - Products", () => {

    // TODO - While adding product modify to add image also.

    // // Test with Valid Email and Password
    // describe("0. Get Valid tokens for testing", () => {
    //     it("Should return Token and admin user", async () => {
    //         let shop = {
    //             "email": "sunoj.vijayan@gmail.com",
    //             "password": "sunoj"
    //         }
    //         const res: Response = await request(app).post("/api/v2/admin/web/login").send(shop);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload)
    //             .to.be.a("object")
    //             .that.includes.all.keys(["loggedIn", "token", "admin_user"]);
    //         expect(res.body.payload.admin_user)
    //             .to.be.a("object")
    //             .that.includes.all.keys(["admin_id", "display_name", "user_type", "email"]);
    //         token = res.body.payload.token;
    //     });
    // });

    // // Test get all Products
    // describe("1. Test if Get All Products is working", () => {
    //     it("Should return list of products", async () => {
    //         const res: Response = await request(app)
    //             .get("/api/v2/admin/web/products")
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.products)
    //             .to.be.a('array')
    //         expect(res.body.payload.products[0])
    //             .that.includes.all.keys(["product_id", "category_id", "company", "name", "image", "description"]);
    //     });
    // });

    // // Test insert new Product
    // describe("2. Test if Insert New Product is working", () => {
    //     it("Should return the newly added Product", async () => {
    //         let Product = {
    //             "category_id": "1",
    //             "company": "Test Company",
    //             "name": "Test Name",
    //             "image": "file-1539741647826.jpg",
    //             "description": "Test Description"
    //         }
    //         const res: Response = await request(app)
    //             .post("/api/v2/admin/web/products")
    //             .set("Authorization", "Bearer " + token)
    //             .send(Product);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.product)
    //             .that.includes.all.keys(["product_id", "category_id", "company", "name", "image", "description"]);
    //         product_id = res.body.payload.product.product_id;
    //     });
    // });

    // // Test Get Product with product_id
    // describe("3. Test if Get Product with product_id is working", () => {
    //     it("Should return the Product with that id", async () => {
    //         const res: Response = await request(app)
    //             .get("/api/v2/admin/web/products?product_id=" + product_id)
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.products)
    //             .to.be.a('array')
    //         expect(res.body.payload.products[0])
    //             .that.includes.all.keys(["product_id", "category_id", "company", "name", "image", "description"]);
    //     });
    // });

    // // Test Get Product with product_id
    // describe("4. Test if Get Product with category_id is working", () => {
    //     it("Should return the Products with that category_id", async () => {
    //         const res: Response = await request(app)
    //             .get("/api/v2/admin/web/products?category_id=1")
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.products)
    //             .to.be.a('array')
    //         expect(res.body.payload.products[0])
    //             .that.includes.all.keys(["product_id", "category_id", "company", "name", "image", "description"]);
    //     });
    // });

    // // Test patch existing Product
    // describe("5. Test if Patch New Product is working", () => {
    //     it("Should return the updated Product", async () => {
    //         let product = {
    //             "category_id": "1",
    //             "company": "Test Company1",
    //             "name": "Test Name1",
    //             "image": "file-1539741647826.jpg",
    //             "description": "Test Description1"
    //         }
    //         const res: Response = await request(app)
    //             .patch("/api/v2/admin/web/products/" + product_id)
    //             .set("Authorization", "Bearer " + token)
    //             .send(product);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload.product)
    //             .that.includes.all.keys(["product_id", "category_id", "company", "name", "image", "description"]);
    //     });
    // });

    // // Test delete existing Product
    // describe("6. Test if Delete Product is working", () => {
    //     it("Should return the deleted Product ID", async () => {
    //         const res: Response = await request(app)
    //             .delete("/api/v2/admin/web/products/" + product_id)
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

    // // Test Get count of Products
    // describe("7. Test if get Products count works", () => {
    //     it("Should return the number of Products", async () => {
    //         const res: Response = await request(app)
    //             .get("/api/v2/admin/web/products/count")
    //             .set("Authorization", "Bearer " + token);
    //         expect(res)
    //             .to.have.status(200)
    //             .to.be.a("object");
    //         expect(res.body)
    //             .that.includes.all.keys(["status", "name", "message"]);
    //         expect(res.body.payload)
    //             .that.includes.all.keys(["products_count"]);
    //     });
    // });
});

