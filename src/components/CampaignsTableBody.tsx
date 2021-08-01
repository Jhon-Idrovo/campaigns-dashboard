import { CampaignInterface } from "../ts/interfaces";
import { TableBody, TableCell, TableRow } from "@material-ui/core";

function CampaignsTableBody(rows: CampaignInterface[]) {
  console.log(rows);

  return (
    <TableBody>
      {rows.map((row) => {
        console.log(" kjhkjhjkhkh");

        return (
          <TableRow key={row.id}>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell align="right">{row.pages}</TableCell>
            <TableCell align="right">{row.impressions}</TableCell>
            <TableCell align="right">{row.leads}</TableCell>
            <TableCell align="right">{row.affiliates}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.spend}</TableCell>
            {/* <TableCell align="right">{row.price - row.spend}</TableCell> */}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default CampaignsTableBody;
