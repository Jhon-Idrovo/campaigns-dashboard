import { CampaignInterface } from "../ts/interfaces";
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useRouter } from "next/router";

function CampaignsTableBody({
  rows,
  hiddenRows,
  classes,
}: {
  rows: CampaignInterface[];
  hiddenRows: string[];
  classes: any;
}) {
  const router = useRouter();
  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow key={row.id}>
            <TableCell align="right" className={classes.tableCell}>
              <Button onClick={() => router.push(`/testing`)}>
                <VisibilityIcon />
              </Button>
            </TableCell>
            {hiddenRows.includes("id") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.id}
              </TableCell>
            )}
            {hiddenRows.includes("pages") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.pages}
              </TableCell>
            )}
            {hiddenRows.includes("impressions") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.impressions}
              </TableCell>
            )}
            {hiddenRows.includes("leads") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.leads}
              </TableCell>
            )}
            {hiddenRows.includes("affiliates") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.affiliates}
              </TableCell>
            )}
            {hiddenRows.includes("price") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.price}
              </TableCell>
            )}
            {hiddenRows.includes("spend") ? null : (
              <TableCell align="right" className={classes.tableCell}>
                {row.spend}
              </TableCell>
            )}
            {/* <TableCell align="right">{row.price - row.spend}</TableCell> */}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default CampaignsTableBody;
