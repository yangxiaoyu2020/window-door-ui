import React from 'react';

import { createRoot } from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';

const contain = document.getElementById("root")
const root = createRoot(contain!);
root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  );
reportWebVitals();
