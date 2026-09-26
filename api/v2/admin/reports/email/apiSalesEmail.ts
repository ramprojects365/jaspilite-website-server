import { RequestHandler } from "express";
import * as nodemailer from 'nodemailer';

import { CustomRquestHandler } from "../../../../../model/express";
import { PublicInfo } from "../../../../../model/shared/messages";
import { SaleSummary } from "../../../../../model/sales/salesSummary";
import * as dbModel from "../../../../../db/model_created";
import * as moment from 'moment';


export const apiSalesEmail: CustomRquestHandler = (req, res, next) => {
    const sales = req.sales;
    var salesDetails = "";
    salesDetails = "<table style='width:100%;background: #fff;padding: 10px;border: 1px solid #ddd;'><tr style='background: #eee;'><th>SNo</th><th>Cus Name</th><th>Date</th><th>Amt</th><th>Status</th></tr>";
    for (var i = 0; i < sales.length; i++) {
        salesDetails += "<tr style='text-align: center;'><td>" + (i + 1) + "</td><td>" + sales[i].displayName + "</td><td>" + moment.unix(sales[i].date).format("DD/MM/YYYY") + "</td><td>" + (parseFloat(sales[i].total) + parseFloat(sales[i].delivery_charge) - parseFloat(sales[i].discount)).toFixed(2) + "</td><td>" + sales[i].status + "</td></tr>";
    }
    var mailOptions = {
        from: 'Minimart Reports',
        to: 'sunoj.vijayan@gmail.com',
        subject: 'Daily - Sales Report',
        // text: 'Hello from node.js'
        html: "<div style='background: #eee;font-size: .875rem;letter-spacing: .25px;font-variant-ligatures: no-contextual;padding: 20px;border-radius: 8px;box-shadow: inset 0 0 0 1px #dadce0;'><div style='background: #00000080;padding:10px;'><img src='https://minimart.app/assets/img/common/minimart-logo.png'><span style='color:#fff;position: absolute;margin-top: 10px;padding-left: 5px;font-size: 15px;font-weight: bold;'>Minimart - Online food & grocery mobile app</span></div><div style='padding-top:10px;'><b>You have a new order from :</b> <br><br><span style='color:#000;'>Branch Name - " + sales[0].branch_name + "<span><br><span style='color:#000;'>Date - " + "" + "</span><br><span style='color:#000;'> <b>Sales Details :</span></b><br><br>" + salesDetails + "</div><div style='padding-top: 60px;'>Regards<br>Minimart Team<br>www.minimart.app</div></div>",
    };
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`error: ${error}`);
        }
        console.log(`Message Sent ${info.response}`);
    });
    res.json(PublicInfo.infoSendData({ sales: sales.map((item: dbModel.product) => new SaleSummary(item)) }));
}

var smtpTransport = nodemailer.createTransport(
    `smtps://sales@convoxy.com:Sunoj@123@smtp.gmail.com`
);
