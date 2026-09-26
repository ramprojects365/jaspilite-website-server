import { RequestHandler } from "express-serve-static-core";
import { executeQuery } from "../../../../../db/db";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import * as dbModel from "../../../../../db/model_created";
import { deliveryVendorsOfBranch } from "../../../../../model/deliveryVendorsList/deliveryVendorsListSummary";

export const apiGetDeliveryVendorListForBranch: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Delivery Vendor List for shop...", req, res);
    // const filters = new deliveryvendorsListFilters(req.query);
    const branchId = req.params.branch_id;
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM delivery_vendors AS dv LEFT JOIN delivery_shops AS ds ON dv.delivery_vendor_id = ds.vendor_id WHERE branch_id = ?;';
    var queryData = [branchId];
    try {
        const services: dbModel.DeliveryVendorsOfBranch[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get Delivery Vendor List for shop...", req, res);
        res.json(PublicInfo.infoSendData({ vendors: services.map((item: dbModel.DeliveryVendorsOfBranch) => new deliveryVendorsOfBranch(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Delivery Vendor List for shop...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}

// curl --include --header 'X-DV-Auth-Token: 01231C99DE895659ED6C7B7F8CFB3FCE259525D4' --data '{"matter":"Documents","points":[{"address":"PL-10, Perdana (Tropics) Shopping Centre, Jalan PJU 8/1, Damansara Perdana, 47820 Petaling Jaya, Selangor"},{"address":"7,7-1 &amp; 7-2, Dinasti Sentral, Jalan Kuchai Maju 18, Off Jalan Kuchai Lama, 58200, Kuala Lumpur, Wilayah Persekutuan"}]}' 'https://robotapitest.mrspeedy.my/api/business/1.1/calculate-order' 