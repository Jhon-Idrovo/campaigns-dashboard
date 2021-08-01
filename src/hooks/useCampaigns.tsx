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
      {
        id: 2,
        pages: 100,
        impressions: 50000,
        leads: 30000,
        affiliates: ["Af3", "Af4"],
        price: 6000,
        spend: 4000,
      },
    ],
    headersMap: [
      { header: "ID", key: "id" },
      { header: "Pages", key: "pages" },
      { header: "Impressions", key: "impressions" },
      { header: "Leads", key: "leads" },
      { header: "Affiliates", key: "affiliates" },
      { header: "Price", key: "price" },
      { header: "Spend", key: "spend" },
    ],
  } as UseCampaignsInterface;
}

export default useCampaigns;
