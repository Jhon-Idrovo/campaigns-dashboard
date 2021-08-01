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
  TablePagination,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { HeaderMappingInterface, TablePropsInterface } from "../ts/interfaces";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

function EnhancedTableHead({
  headersMap,
  order,
  orderBy,
  handleRequestSort,
  classes,
}: {
  headersMap: HeaderMappingInterface[];
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
        {headersMap.map(({ header: h, key }) => (
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

function rowsMergeSort<T>(
  rows: T[],
  l: number,
  r: number,
  orderBy: string,
  order: Order
) {
  //T is the type of one row, not the list of them
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  rowsMergeSort(rows, l, m, orderBy, order);
  rowsMergeSort(rows, m + 1, r, orderBy, order);
  merge<T>(rows, l, m, r, orderBy, order);
}
function merge<T>(
  arr: T[],
  l: number,
  m: number,
  r: number,
  orderBy: string,
  order: Order
) {
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
  let arrIndex = 0;
  while (lIndex < lengthL && rIndex < lengthR) {
    //compare the rows
    //orderBy is a key and L[lindex] is an object

    //descendent order
    if (order === "desc") {
      if (L[lIndex][orderBy] <= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
    }
    //ascendent order
    if (order === "asc") {
      if (L[lIndex][orderBy] >= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
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

function EnhancedTable({ headersMap, rows, Body }: TablePropsInterface) {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  //rows are displayed on the same order as the headers indexes
  const [orderBy, setOrderBy] = useState<string>(headersMap[0].header);
  const [dense, setDense] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    rowsMergeSort<typeof rows[0]>(
      rows,
      0,
      rows.length - 1,
      headersMap.filter(({ header, key }) => header === orderBy)[0].key,
      order
    );
  }, [orderBy, order]);
  /**
   * sort the rows when requested
   */
  const handleRequestSort = (header: string) => {
    //determine the sorting order. If we don't have the table already sorted
    //with the same column, we need to start sortin ascendently
    const isAsc = orderBy === header && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(header);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              headersMap={headersMap}
              order={order}
              orderBy={orderBy}
              handleRequestSort={handleRequestSort}
              classes={classes}
            />
            <Body rows={rows} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, page) => setPage(page)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch checked={dense} onChange={() => setDense((prev) => !prev)} />
        }
        label="Dense padding"
      />
    </div>
  );
}

export default EnhancedTable;
