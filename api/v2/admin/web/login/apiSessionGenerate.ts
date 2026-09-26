import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

import { CustomRquestHandler } from "../../../../../model/express";
import { PublicInfo, OauthInfo } from "../../../../../model/shared/messages";
import { AdminUserSummary } from "../../../../../model/adminuser/adminUserSummary";
import { sessionTokenSecret, sessionTokenLifetime, refreshTokenSecret, refreshTokenLifetime } from "../../../../../config/server/sessionConfig";

export const apiSessionGenerate: CustomRquestHandler = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({userID: req.user.id}, sessionTokenSecret, {expiresIn: sessionTokenLifetime});
        const refreshToken = jwt.sign({userID: req.user.id}, refreshTokenSecret, {expiresIn: refreshTokenLifetime});
        res.json(PublicInfo.infoSendData({ "loggedIn": true, "token": token, "refreshToken": refreshToken , "admin_user": new AdminUserSummary(req.user)}));
    }
}

export const apiTokenGenerate: CustomRquestHandler = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({userID: req.user.id}, sessionTokenSecret, {expiresIn: sessionTokenLifetime});
        const refreshToken = jwt.sign({userID: req.user.id}, refreshTokenSecret, {expiresIn: refreshTokenLifetime});
        res.json(OauthInfo.loginSendToken(token));
    }
}
