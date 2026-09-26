import { CustomRquestHandler } from "../../../model/express";

export const requestLogger: CustomRquestHandler = (req, res, next) => {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    //console.log("User: " + req.user + " - " + new Date() + " - " + req.method + " - " + req.path);
    if(req.user){
        console.log("User: " + req.user + " - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl);
    }else{
        console.log("User: Guest - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl);
    }
    next();
}