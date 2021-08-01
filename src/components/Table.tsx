import React, { useState, useEffect } from "react";
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

function EnhancedTableHead({
  headers,
  order,
  orderBy,
  handleRequestSort,
  classes,
}: {
  headers: string[];
  order: Order;
  orderBy: number;
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
        {headers.map((h, index) => (
          <TableCell
            key={h}
            align="right"
            sortDirection={orderBy === index ? order : false}
          >
            <TableSortLabel
              active={orderBy === index}
              direction={orderBy === index ? order : "asc"}
              onClick={() => handleRequestSort(index)}
            >
              {h}
              {orderBy === index ? (
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

function rowsMergeSort<T>(rows: T[], l: number, r: number, orderBy: number) {
  //T is the type of one row, not the list of them
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  rowsMergeSort(rows, l, m, orderBy);
  rowsMergeSort(rows, m + 1, r, orderBy);
  merge<T>(rows, l, m, r, orderBy);
}
function merge<T>(arr: T[], l: number, m: number, r: number, orderBy: number) {
  const lengthL = m - l + 1;
  const lengthR = r - m;

  let L = Array(lengthL);
  let R = Array(lengthR);
  //temp arrays
  for (let i = 0; i < lengthL; i++) {
    L[i] = arr[l + i];
  }
  for (let i = 0; i < lengthR; i++) {
    R[i] = arr[m + 1 + i];
  }

  //merging temp arrays back to the orinignal one
  let lIndex, rIndex;
  lIndex = rIndex = 0;
  let arrIndex = 1;
  while (lIndex < lengthL && rIndex < lengthR) {
    //compare the rows
    //orderBy is an index and L[lindex] is an object
    if (L[lIndex][orderBy] <= R[rIndex][orderBy]) {
      arr[arrIndex] = L[lIndex];
      lIndex++;
    } else {
      arr[arrIndex] = R[rIndex];
      rIndex++;
    }
    arrIndex++;
    //copying the remaining elements of R or L, if any
    while (lIndex < lengthL) {
      arr[arrIndex] = L[lIndex];
      lIndex++;
      arrIndex++;
    }
    while (rIndex < lengthR) {
      arr[arrIndex] = R[rIndex];
      rIndex++;
      arrIndex++;
    }
  }
}
function EnhancedTable({ headers, rows, Body }: TablePropsInterface) {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");

  //rows are displayed on the same order as the headers indexes
  const [orderBy, setOrderBy] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    rowsMergeSort<typeof rows[0]>(rows, 0, rows.length - 1, orderBy);
  }, [orderBy, order]);
  /**
   * sort the rows when requested
   */
  const handleRequestSort = (col: number) => {
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
            <Body rows={rows} />
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default EnhancedTable;
