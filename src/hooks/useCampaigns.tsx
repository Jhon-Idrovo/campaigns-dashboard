import { CampaignInterface } from "../ts/interfaces";

function useCampaigns() {
  //use react-query to get the data from the server

  return [
    {
      id: 152,
      pages: 10,
      impressions: 30000,
      leads: 15000,
      affiliates: ["Af1", "Af2"],
      price: 3000,
      spend: 2500,
    },
  ] as CampaignInterface[];
}

export default useCampaigns;
