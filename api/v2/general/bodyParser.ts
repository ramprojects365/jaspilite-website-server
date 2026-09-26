import bodyParser from "body-parser";
export const jsonParser = bodyParser.json();
export const jsonParserUrlencoder = bodyParser.urlencoded({
    extended: true
})
