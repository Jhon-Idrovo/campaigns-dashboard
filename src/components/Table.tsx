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
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { HeaderMappingInterface, TablePropsInterface } from "../ts/interfaces";

import MoreHoriz from "@material-ui/icons/MoreHoriz";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

function EnhancedTableHead({
  hiddenRows,
  headersMap,
  order,
  orderBy,
  handleRequestSort,
  classes,
}: {
  hiddenRows: string[];
  headersMap: HeaderMappingInterface[];
  order: Order;
  orderBy: string;
  handleRequestSort: Function;
  classes: ReturnType<typeof useStyles>;
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headersMap.map(({ header: h, key }) => {
          if (hiddenRows.includes(key)) {
            return;
          }
          return (
            <TableCell
              key={h}
              align="right"
              sortDirection={orderBy === h ? order : false}
              className={classes.headerCell}
            >
              <TableSortLabel
                active={orderBy === h}
                direction={orderBy === h ? order : "asc"}
                onClick={() => handleRequestSort(h)}
              >
                {h}
                {orderBy === h ? (
                  <span className={classes.visuallyHidden}>
                    {order === "asc"
                      ? "sorting ascending"
                      : "sorting descending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
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
      minWidth: 0,
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
    configBar: {
      flexGrow: 1,
    },
    menuItem: {
      minHeight: 0,
    },
    headerCell: {
      padding: 0,
    },
    tableCell: {
      padding: 0,
    },
    moreCell: {},
  })
);

type Order = "asc" | "desc";

function EnhancedTable({ headersMap, rows, Body }: TablePropsInterface) {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  //rows are displayed on the same order as the headers indexes
  const [orderBy, setOrderBy] = useState<string>(headersMap[0].header);
  const [dense, setDense] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  //hidden rows
  const [hiddenRows, setHiddenRows] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleHiddenSwitchClick = (key: string) => {
    const kIndex = hiddenRows.indexOf(key);
    let newHiddenRows = [...hiddenRows];
    kIndex === -1 ? newHiddenRows.push(key) : newHiddenRows.splice(kIndex, 1);
    setHiddenRows(newHiddenRows);
  };
  useEffect(() => {
    rowsMergeSort<typeof rows[0]>(
      rows,
      0,
      rows.length - 1,
      headersMap.filter(({ header }) => header === orderBy)[0].key,
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
        <div className={classes.configBar}>
          <IconButton
            aria-controls="hidde colums menu"
            aria-haspopup="true"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {headersMap.map(({ header, key }) => (
              <MenuItem className={classes.menuItem}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!hiddenRows.includes(key)}
                      onChange={() => handleHiddenSwitchClick(key)}
                      size="small"
                    />
                  }
                  label={header}
                />
              </MenuItem>
            ))}
            <MenuItem>
              <FormControlLabel
                control={<Button onClick={() => setHiddenRows([])} />}
                label="Show all"
              />
            </MenuItem>
          </Menu>
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={() => setDense((prev) => !prev)}
                size="small"
              />
            }
            label="Dense padding"
          />
        </div>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              hiddenRows={hiddenRows}
              headersMap={headersMap}
              order={order}
              orderBy={orderBy}
              handleRequestSort={handleRequestSort}
              classes={classes}
            />
            <Body rows={rows} hiddenRows={hiddenRows} classes={classes} />
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
    </div>
  );
}

export default EnhancedTable;

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
