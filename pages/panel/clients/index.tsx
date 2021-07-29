import Layout from "../../../src/components/Layout";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";

import useClients from "../../../src/hooks/useClients";

function Index() {
  const rows = useClients();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "type",
      type: "string",
      headerName: "Type",
      resizable: true,
      headerAlign: "left",
      align: "right",
      width: 130,
      editable: true,
    },
    {
      field: "comments",
      type: "string",
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
