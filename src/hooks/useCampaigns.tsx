import { UseCampaignsInterface } from "../ts/interfaces";

function useCampaigns() {
  //use react-query to get the data from the server
  //header are in the same order as the keys in the rows object
  return {
    rows: [
      {
        id: 152,
        pages: 10,
        impressions: 30000,
        leads: 15000,
        affiliates: ["Af1", "Af2"],
        price: 3000,
        spend: 2500,
      },
    ],
    headers: [
      "ID",
      "Pages",
      "Impressions",
      "Leads",
      "Affiliates",
      "Price",
      "Spend",
    ],
  } as UseCampaignsInterface;
}

export default useCampaigns;
