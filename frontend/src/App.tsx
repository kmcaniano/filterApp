import UserTable from './components/UserTable';
import { Box, Container } from '@mui/material';
import Filters from './components/Filters';
import { Provider } from './FilterContext';


function App() {

  return (
    <Provider>
      <Box
        sx={{
          marginTop: '16px',
          alignItems: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Filters></Filters>
        <UserTable></UserTable>
      </Box>
    </Provider>)

}

export default App;
