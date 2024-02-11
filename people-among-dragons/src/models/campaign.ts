export class Campaign {
    _campaignId: number;
    _campaignName: string;
    _campaignImage: string;

    constructor(campaignId: number, campaignName: string, campaignImage: string){
        this._campaignId = campaignId;
        this._campaignName = campaignName;
        this._campaignImage = campaignImage;
    }
}