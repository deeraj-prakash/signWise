import {Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Scrollbar from "src/components/Scrollbar";

export default function PaymentRequest(){
    return(
        <Card sx={{ pb: 3 }}>
        <CardHeader title="Payments" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 620 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Partner</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
              No Data Available 
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    )
}