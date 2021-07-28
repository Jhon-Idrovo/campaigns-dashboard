import Layout from "../../../src/components/Layout";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams
} from "@material-ui/data-grid";

import useCampaigns from "../../../src/hooks/useCampaigns";
function Index() {
  const rows = useCampaigns();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 40
    },
    {
      field: "pages",
      type: "number",
      headerName: "Pages",
      width: 40,
      editable: true
    },
    {
      field: "impressions",
      type: "number",
      headerName: "Impressions",
      width: 40,
      editable: true
    },
    {
      field: "leads",
      type: "number",
      headerName: "Leads",
      width: 40,
      editable: true
    },
    {
      field: "affiliates",
      headerName: "Affiliates",
      width: 40,
      editable: true,
      sorteable: false
    },
    {
      field: "price",
      type: "number",
      headerName: "Price",
      width: 40,
      editable: true
    },
    {
      field: "spend",
      type: "number",
      headerName: "Spend",
      width: 40,
      editable: true
    },
    {
      field: "profit",
      type: "number",
      headerName: "Profit",
      width: 40,
      valueGetter: (params: GridValueGetterParams) =>
        params.getValue(params.id, "Price") -
        params.getValue(params.id, "spend")
    },
    {
      field: "profitMargin",
      headerName: "Profit %",
      width: 40,
      valueGetter: (params: GridValueGetterParams) =>
        (params.getValue(params.id, "profit") /
          params.getValue(params.id, "price")) *
        100
    }
  ];
  return (
    <Layout>
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Layout>
  );
}

export default Index;
