export class UserSummary {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    totalPoints: string;
    providerId: string;
    fcmToken: string;
    deviceName: string;
    deviceOs: string;
    loginStatus: boolean;
    token: string;
    refreshToken: string;
    constructor(data: any) {
        this.uid = data.uid;
        this.displayName = data.displayName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.photoUrl = data.photoUrl;
        this.totalPoints = data.totalPoints;
        this.providerId = data.providerId;
        this.fcmToken = data.fcmToken;
        this.deviceName = data.deviceName;
        this.deviceOs = data.deviceOs;
        this.loginStatus = data.loginStatus;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
    };
}