import { Request } from "express-serve-static-core";
import { Response } from "express";
import { NextFunction } from "connect";

import * as dbModel from "../db/model_created";

export interface CustomRequest extends Request {
    user?: any;
    sales?: any;
}

export interface CustomResponse extends Response {

}

export type CustomRquestHandler = (req: CustomRequest, res: CustomResponse, next: NextFunction) => any;