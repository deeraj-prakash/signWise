import faker from 'faker';
import { sentenceCase } from 'change-case';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils

//
import Label from 'src/components/Label';
import Scrollbar from 'src/components/Scrollbar';
export default function Calls(){
    const theme = useTheme();
    return(
        <Card sx={{ pb: 3 }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: 160 }} align='center'>Date</TableCell>
                <TableCell align='center'>Direction</TableCell>
                <TableCell align='center'>From</TableCell>
                <TableCell align='center'>To</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              <Typography>No data available</Typography>
              {/* {BEST_SALES.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <img src={row.flag} alt="country flag" />
                  </TableCell>
                  <TableCell>{fCurrency(row.total)}</TableCell>
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.rank === 'top_1' && 'primary') ||
                        (row.rank === 'top_2' && 'info') ||
                        (row.rank === 'top_3' && 'success') ||
                        (row.rank === 'top_4' && 'warning') ||
                        'error'
                      }
                    >
                      {sentenceCase(row.rank)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
    )
}