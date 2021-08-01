import CampaignsTableBody from "../../../src/components/CampaignsTableBody";
import EnhancedTable from "../../../src/components/Table";
import useCampaigns from "../../../src/hooks/useCampaigns";

function Test() {
  const { rows, headers } = useCampaigns();

  return (
    <div>
      <EnhancedTable headers={headers} rows={rows} Body={CampaignsTableBody} />
    </div>
  );
}

export default Test;
