import express from "express";
import { routerV2 } from "./api/v2/v2";
import path from "path";

const app = express();
export default app;
const port = process.env.PORT || 3000;

//diable header information about server type - Express
app.disable("x-powered-by");

//------- TO BE REMOVED IN FUTURE
app.use("/", express.static(path.resolve("./", "client")));
// app.use("/product_images", express.static(path.resolve("./", "public", "product_images")));
//-------
app.use("/public", express.static(path.resolve("./", "public")));
app.all('/*', function (request, response, next) {
    // Just send the index.html for other files to support HTML5Mode
    // console.log(request.url);
    delete request.headers['content-encoding'];
    if (request.url.indexOf('api') <= 0 && request.url.indexOf('public') <= 0) {
        response.sendFile('index.html', { root: __dirname + '/client' });
    } else {
        next();
    }
});
app.use("/api/v2", routerV2);

app.listen(port, () => {
    console.log("Server Started At Port " + port);
});