export class CreatedCampaign {
    _campaignName: string;
    _isPrivate: boolean;
    _campaignPassword: string;

    constructor(campaignName: string, isPrivate: boolean, campaignPassword: string){
        this._campaignName = campaignName;
        this._isPrivate = isPrivate;
        this._campaignPassword = campaignPassword;
    }
}