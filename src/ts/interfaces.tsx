import { RoomSharp, RowingSharp } from "@material-ui/icons";
import { ReactNode } from "react";

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
  headersMap: { header: string; key: string }[];
}

export declare interface AffiliateInterface {
  id: number;
  campaigns: string[];
  paid: number;
  reach: number;
  comments: string;
}
export declare interface HeaderMappingInterface {
  header: string;
  key: string;
}
export declare interface TablePropsInterface {
  headersMap: HeaderMappingInterface[];
  rows: AffiliateInterface[] | CampaignInterface[] | ClientInterface[];
  Body: Function;
}
