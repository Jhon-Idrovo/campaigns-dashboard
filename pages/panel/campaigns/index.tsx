import CampaignsTableBody from "../../../src/components/CampaignsTableBody";
import Layout from "../../../src/components/Layout";
import EnhancedTable from "../../../src/components/Table";

import useCampaigns from "../../../src/hooks/useCampaigns";
function Index() {
  const { rows, headersMap } = useCampaigns();
  return (
    <Layout>
      <EnhancedTable
        rows={rows}
        headersMap={headersMap}
        Body={CampaignsTableBody}
      />
    </Layout>
  );
}

export default Index;
