import { RequestHandler } from "express-serve-static-core";
let Req: any;
let Res: any;
let Next: any;

export const responseLogs: RequestHandler = (req, res, next) => {
    res.locals.logs = [];
    Req = req;
    Res = res;
    Next = next;
    next();
}

export class responseLogger {
    static print(text: string, req: any, res: any, ) {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        if (req.user) {
            Res.locals.logs.push("User: " + req.user.displayName + " - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl + " - " + text);
        } else {
            Res.locals.logs.push("User: Guest - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl + " - " + text);
        }
    };
    static outputLog() {
        Res.locals.logs.map((item: string) => {
            console.log(item);
        });
        console.log("----------------------------------------------");
    };
}

