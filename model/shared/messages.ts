import { responseLogger } from "../../api/v2/general/responseLogs";

export class ApiError extends Error {
    constructor(
        name: string,
        message: string,
        public status: number,
        public properties?: any,
        public internalProperties?: any) {
        super();
        this.name = name;
        this.message = message;
    }
    publicVersion() {
        return new PublicError(this);
    };
    static errNotFound(properties?: any, internalProperties?: any) {
        return new ApiError("Resource Not Found", "The specific resource does not exist", 404, properties, internalProperties);
    };
    static errInvalidQueryParameters(properties?: any, internalProperties?: any) {
        return new ApiError("Invalid Query Parameters", "One of the query parameters is invalid", 400, properties, internalProperties);
    };
    static errMissingBody(properties?: any, internalProperties?: any) {
        return new ApiError("Missing Body", "Missing Data in Request Body", 400, properties, internalProperties);
    };
    static errServerError(properties?: any, internalProperties?: any) {
        return new ApiError("Internal Server Error", "Request could not be carried out", 500, properties, internalProperties);
    };
    static errInDatabase(properties?: any, internalProperties?: any) {
        return new ApiError("Database Error", "There was an error in executing db query", 500, properties, internalProperties);
    };
    static errInDatabaseDuplicate(properties?: any, internalProperties?: any) {
        return new ApiError("Database Error", "The resource already exists in database", 409, properties, internalProperties);
    };
    static emptyUidOrPass(properties?: any, internalProperties?: any) {
        return new ApiError("Login Error", "The user id or password cannot be empty.", 404, properties, internalProperties);
    };
    static userNotActive(properties?: any, internalProperties?: any) {
        return new ApiError("Login Error", "The user id is not active.", 404, properties, internalProperties);
    };
    static loginFailed(properties?: any, internalProperties?: any) {
        return new ApiError("Login Error", "The user id or password is not correct.", 404, properties, internalProperties);
    };
    static errUnauthorizedError(properties?: any, internalProperties?: any) {
        return new ApiError("Unauthorized", "Client authorization failed.", 401, properties, internalProperties);
    };
    static errUploadImageFailed(properties?: any, internalProperties?: any) {
        return new ApiError("Upload Failed", "Image upload failed.", 406, properties, internalProperties);
    };
    static errCopyImageFailed(properties?: any, internalProperties?: any) {
        return new ApiError("Copy Failed", "Image Copy failed.", 406, properties, internalProperties);
    };
    static errItemsCountExceededLimit(properties?: any, internalProperties?: any) {
        return new ApiError("Items count exceeded limit", "Items count more than 50", 400, properties, internalProperties);
    };
    static errNoItemsFound(properties?: any, internalProperties?: any) {
        return new ApiError("Items not found", "No items found", 400, properties, internalProperties);
    };
    static promoExists(properties?: any, internalProperties?: any) {
        return new ApiError("Promotion exists", "Promotion already exists in the given time frame", 400, properties, internalProperties);
    };
    static contactUsError(properties?: any, internalProperties?: any) {
        return new ApiError("Error sending email", "Error sending contactus email", 400, properties, internalProperties);
    };
}

export class PublicError {
    name: string;
    message: string;
    status: number;
    properties?: any;
    constructor(err: ApiError) {
        this.name = err.name;
        this.message = err.message;
        this.status = err.status;
        this.properties = err.properties;
    }
}

export class PublicInfo {
    constructor(
        public name: string,
        public message: string,
        public status: number,
        public payload?: any,
        public properties?: any) { };

    static loginSendData(payload?: any, access_token?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Success", 200, access_token, payload);
    };
    static infoSendData(payload?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Success", 200, payload);
    };
    static infoCreated(properties?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Created", 201, properties);
    };
    static infoUpdated(properties?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Updated", 201, properties);
    };
    static infoNotUpdated(properties?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Not Updated", 406, properties);
    };
    static infoDeleted(properties?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Deleted", 204, properties);
    };
    static loginSuccess(properties?: any) {
        responseLogger.outputLog();
        return new PublicInfo("Success", "Login Succesful", 200, properties);
    };
}

export class OauthInfo {
    constructor(
        public name: string,
        public message: string,
        public status: number,
        public access_token: string) { };

    static loginSendToken(access_token: any) {
        responseLogger.outputLog();
        return new OauthInfo("Success", "Success", 200, access_token);
    };
}
