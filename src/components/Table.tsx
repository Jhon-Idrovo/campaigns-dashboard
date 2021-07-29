import React, { useState } from "react";
import {
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import { Paper, Table, TableRow } from "material-ui";
import { TablePropsInterface } from "../ts/interfaces";
import VisibilityIcon from "@material-ui/icons/Visibility";

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

function EnhancedTableHead({
  headers,
  order,
  orderBy,
  handleRequestSort,
}: {
  headers: string[];
  order: Order;
  orderBy: string;
  handleRequestSort: Function;
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {/* <Button>
        <VisibilityIcon/>
      </Button> */}
        </TableCell>
        {headers.map((h) => (
          <TableCell key={h} align="left">
            <TableSortLabel>{h}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

type Order = "asc" | "desc";

function EnhancedTable({ headers, rows }: TablePropsInterface) {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  /**
   * sort the rows when requested
   */
  const handleRequestSort = (col: string) => {
    //determine the sorting order. If we don't have the table already sorted
    //with the same column, we need to start sortin ascendently
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  const handlePageChange = () => {};

  const handleChangeRowsPerPage = () => {};

  const handleSeeMore = () => {};
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headers={headers}
              order={order}
              orderBy={orderBy}
              handleRequestSort={handleRequestSort}
            />
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Table;
