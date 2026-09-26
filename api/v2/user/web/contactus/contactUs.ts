import { RequestHandler } from "express-serve-static-core";
import * as nodemailer from 'nodemailer';

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { BranchSummary } from "../../../../../model/branch/branchSummary"
import { BranchGetFilters } from "../../../../../model/branch/branchFilters";
import { responseLogger } from "../../../general/responseLogs";

var transporter = nodemailer.createTransport(
    `smtps://sales%40convoxy.com:Sunoj@123@smtp.gmail.com`
);


export const apiContactUs: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling contact us send email..", req, res);
    var mailOptions = { 
        from : 'sales@minimart.com', 
        to : 'sunoj.vijayan@gmail.com, nagaramaganga@gmail.com', 
        subject : req.body.subject, 
        text: "\n\nNew message from " + req.body.name + "\n\nNumber " + req.body.number + "\n\nEmail " + req.body.email + "\n\n Message " + req.body.message 
      }; 
   
      transporter.sendMail( mailOptions, (error, info) => { 
        if (error) { 
            responseLogger.print("Error in contact us send email...", req, res);
            return next(ApiError.contactUsError(error));
        } 
        console.log(`Message Sent ${info.response}`);
        responseLogger.print("Completed contact us send email...", req, res);
        res.json(PublicInfo.infoSendData({}));
      });
}