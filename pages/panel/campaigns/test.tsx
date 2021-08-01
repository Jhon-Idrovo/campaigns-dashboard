import CampaignsTableBody from "../../../src/components/CampaignsTableBody";
import EnhancedTable from "../../../src/components/Table";
import useCampaigns from "../../../src/hooks/useCampaigns";

function Test() {
  const { rows, headersMap } = useCampaigns();

  return (
    <div>
      <EnhancedTable
        headersMap={headersMap}
        rows={rows}
        Body={CampaignsTableBody}
      />
    </div>
  );
}

export default Test;
