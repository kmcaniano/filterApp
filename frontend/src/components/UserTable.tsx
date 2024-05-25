import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell, TableRow } from '@mui/material';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import { FilterContext } from '../FilterContext';


export default function UserTable() {

  const { users } = useContext(FilterContext);

  return (<TableContainer component={Paper} sx={{
    marginTop: '32px',
    maxHeight: '80vh',
    maxWidth: '80vw'
  }}>
    <Table>
      <TableBody>
        <TableRow key={-1} sx={{ backgroundColor: '#1CE783' }}>
          <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
        </TableRow>ß
        {users.map((user, i) => (
          <TableRow key={i} data-testid="user-rows" style={i % 2 ? { background: "#1CE783" } : { background: "white" }}>
            <TableCell scope="row">
              {user.firstName}
            </TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.company}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>);

}