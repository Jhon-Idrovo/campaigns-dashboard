export declare interface ClientInterface {
  id: Number;
  name: string;
  type: string;
  comments: string;
}

export declare interface CampaignInterface {
  id: Number;
  pages: Number;
  impressions: Number;
  leads: Number;
  affiliates: string[];
  price: Number;
  spend: Number;
}

export declare interface AffiliateInterface {
  id: Number;
  campaigns: string[];
  paid: Number;
  reach: Number;
  comments: string;
}
