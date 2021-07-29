import Layout from "../../../src/components/Layout";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";

import useCampaigns from "../../../src/hooks/useCampaigns";
function Index() {
  const rows = useCampaigns();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "pages",
      headerName: "Pages",
      type: "number",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "impressions",
      type: "number",
      headerName: "Impressions",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 170,
      editable: true,
    },
    {
      field: "leads",
      type: "number",
      headerName: "Leads",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "affiliates",
      headerName: "Affiliates",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 150,
      editable: true,
      sortable: false,
    },
    {
      field: "price",
      type: "number",
      headerName: "Price",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "spend",
      type: "number",
      headerName: "Spend",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "profit",
      type: "number",
      headerName: "Profit",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        params.getValue(params.id, "price") -
        params.getValue(params.id, "spend"),
    },
    {
      field: "profitMargin",
      headerName: "Profit %",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        Math.round(
          (params.getValue(params.id, "profit") /
            params.getValue(params.id, "price")) *
            100
        ),
    },
  ];
  return (
    <Layout>
      <div className="data-grid-container">
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
