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
    static print(text: string, req: any, res: any) {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const targetRes = res || Res;
        if (!targetRes.locals) targetRes.locals = {};
        if (!targetRes.locals.logs) targetRes.locals.logs = [];
        if (req && req.user) {
            targetRes.locals.logs.push("User: " + (req.user.displayName || "Unknown") + " - " + new Date().toLocaleString('en-IN', options) + " - " + (req.method || "") + " - " + (req.originalUrl || "") + " - " + text);
        } else {
            targetRes.locals.logs.push("User: Guest - " + new Date().toLocaleString('en-IN', options) + " - " + (req ? req.method : "") + " - " + (req ? req.originalUrl : "") + " - " + text);
        }
    };
    static outputLog() {
        Res.locals.logs.map((item: string) => {
            console.log(item);
        });
        console.log("----------------------------------------------");
    };
}

