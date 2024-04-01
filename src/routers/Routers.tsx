import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from '@/views/layout';
// import Table from '@/views/table/index';
// import Graph from '@/views/graph/index';
// import CreateChart from '@/views/graph/create';
// import Demo from '@/views/demo/index';
// import Error403 from '@/views/errorPage/403';
// import Login from '@/views/login/index';
import ErrorPage404 from '../views/errorPage/404';


const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/404" element={<ErrorPage404 />} />
    </Routes>
  </Router>
);

export default AppRouter;
