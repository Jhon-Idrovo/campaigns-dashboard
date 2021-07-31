export declare interface ClientInterface {
  id: number;
  name: string;
  type: string;
  comments: string;
}

export declare interface CampaignInterface {
  id: number;
  pages: number;
  impressions: number;
  leads: number;
  affiliates: string[];
  price: number;
  spend: number;
}

export declare interface UseCampaignsInterface {
  rows: CampaignInterface[];
  headers: string[];
}

export declare interface AffiliateInterface {
  id: number;
  campaigns: string[];
  paid: number;
  reach: number;
  comments: string;
}

export declare interface TablePropsInterface {
  headers: string[];
  rows: AffiliateInterface[] | CampaignInterface[] | ClientInterface[];
}
