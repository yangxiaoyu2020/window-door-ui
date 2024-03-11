import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from "react-dom/client";
import NavigationBar from './components/NavigationBar';
import reportWebVitals from './reportWebVitals';
import App from './App';

const contain = document.getElementById("root")
const root = createRoot(contain!);
root.render(<App />);

reportWebVitals();
