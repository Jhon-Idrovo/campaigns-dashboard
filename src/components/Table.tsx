import React, { useState } from "react";
import {
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  Paper,
  Table,
  TableRow,
  TableBody,
} from "@material-ui/core";
import {
  AffiliateInterface,
  CampaignInterface,
  ClientInterface,
  TablePropsInterface,
} from "../ts/interfaces";
import VisibilityIcon from "@material-ui/icons/Visibility";

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

function descendingComparator<T>(rowA: T, rowB: T, orderBy: keyof T) {
  if (rowA[orderBy] > rowB[orderBy]) {
    return -1;
  }
  if (rowA[orderBy] < rowB[orderBy]) {
    return 1;
  }
  return 0;
}

function EnhancedTableHead({
  headers,
  order,
  orderBy,
  handleRequestSort,
  classes,
}: {
  headers: string[];
  order: Order;
  orderBy: string;
  handleRequestSort: Function;
  classes: ReturnType<typeof useStyles>;
}) {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell>
          <Button>
        <VisibilityIcon/>
      </Button>
        </TableCell> */}
        {headers.map((h) => (
          <TableCell
            key={h}
            align="right"
            sortDirection={orderBy === h ? order : false}
          >
            <TableSortLabel
              active={orderBy === h}
              direction={orderBy === h ? order : "asc"}
              onClick={() => handleRequestSort(h)}
            >
              {h}
              {orderBy === h ? (
                <span className={classes.visuallyHidden}>
                  {order === "asc" ? "sorting ascending" : "sorting descending"}
                </span>
              ) : null}
            </TableSortLabel>
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
  const [orderBy, setOrderBy] = useState<keyof typeof rows[0]>("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  function mergeSort<T>(rows: T[], sortBy: keyof T) {
    return rows;
  }
  /**
   * sort the rows when requested
   */
  const handleRequestSort = (col: keyof typeof rows[0]) => {
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
              classes={classes}
            />
            <TableBody>
              {mergeSort<typeof rows[0]>(rows, orderBy).map()}
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  //role="button"
                >
                  {Object.values(row).map((val) => (
                    <TableCell key={val + row.id} align="right">
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default EnhancedTable;
