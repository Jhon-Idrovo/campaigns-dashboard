import Layout from "../../../src/components/Layout";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

import useAffiliates from "../../../src/hooks/useAffiliates";

function Index() {
  const rows = useAffiliates();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "campaigns",

      headerName: "Campaigns",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "paid",
      type: "number",
      headerAlign: "left",
      align: "right",
      resizable: true,
      headerName: "Paid",
      width: 130,
      editable: true,
    },
    {
      field: "reach",
      type: "number",
      headerName: "Reach",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
      sortable: false,
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
