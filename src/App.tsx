import React  from 'react';


import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Header from './views/layout/Header';
import Sidebar from './views/layout/Sidebar';
import MainContent from './views/layout/MainContent';


const App: React.FC = () => {


return (
  <CssVarsProvider disableTransitionOnChange>
    <CssBaseline />
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <MainContent />
      </Box>
  </CssVarsProvider>
);
}

export default App;