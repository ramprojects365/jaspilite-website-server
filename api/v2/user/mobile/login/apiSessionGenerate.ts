import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

import { CustomRquestHandler } from "../../../../../model/express";
import { PublicInfo } from "../../../../../model/shared/messages";
import { sessionTokenSecret, sessionTokenLifetime, refreshTokenSecret, refreshTokenLifetime } from "../../../../../config/server/sessionConfig";
import { UserSummary } from "../../../../../model/user/userSummary";

export const apiSessionGenerate: CustomRquestHandler = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({userID: req.user.id}, sessionTokenSecret, {expiresIn: sessionTokenLifetime});
        const refreshToken = jwt.sign({userID: req.user.id}, refreshTokenSecret, {expiresIn: refreshTokenLifetime});
        req.user.token = token;
        req.user.refreshToken = refreshToken;
        res.json(PublicInfo.infoSendData({"user": new UserSummary(req.user)}));
    }
}
