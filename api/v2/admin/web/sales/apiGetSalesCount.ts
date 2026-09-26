import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { executeQuery, mySqlPool } from "../../../../../db/db";
import { SalesCountFilters } from "../../../../../model/sales/salesFilter";

export const ApiGetSalesCount: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Sales Count...", req, res);
    // var queryData: any[] | undefined = [];
    // const user_id = req.query.user_id;
    var sqlQuery = "";
    if (req.query.user_id == undefined && req.query.branch_id == undefined) {
        sqlQuery = 'SELECT COUNT(total) AS orders_count FROM sales as sal INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE sstat.status !="Cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW()); SELECT COUNT(total) AS active_count FROM sales as sal INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE sstat.status !="Cancelled" AND sstat.status !="Delivered";';
    } else {
        const filters = new SalesCountFilters(req.query);
        // if (user_id) {
        sqlQuery = 'SELECT count(sal.sales_id) AS orders_count FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id WHERE MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW()) AND ' + filters.getCondition() + '; SELECT count(sal.sales_id) AS active_count FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND sstat.status !="DELIVERED" AND sstat.status !="Cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW());';
    }
    // queryData = [user_id, user_id];
    // } else {
    //     var sqlQuery = 'SELECT count(sales_id) as orders_count FROM sales';
    // }
    try {
        const orderCount = await executeQuery(sqlQuery);
        console.log("------------------------");
        console.log(orderCount);
        console.log("------------------------");
        responseLogger.print("Completed Get Sales count...", req, res);
        // if (user_id) {
        res.json(PublicInfo.infoSendData({ orders_count: orderCount[0][0].orders_count, active_count: orderCount[1][0].active_count }));
        // } else {
        //     res.json(PublicInfo.infoSendData({ orders_count: orderCount[0].orders_count }));
        // }
    } catch (error) {
        responseLogger.print("Error Get Sales Count...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}