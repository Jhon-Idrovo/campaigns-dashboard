import EnhancedTable from "../../../src/components/Table";
import useCampaigns from "../../../src/hooks/useCampaigns";

function Test() {
  const { rows, headers } = useCampaigns();
  console.log(rows, headers);

  return (
    <div>
      <EnhancedTable headers={headers} rows={rows} />
    </div>
  );
}

export default Test;
