import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import OrderList from './components/OrderList';
import Pipeline from './components/Pipeline';
import './App.css'; // 导入自定义的 CSS 文件
// import FactoryPage from './components/FactoryPage';
// import LogisticsPage from './components/LogisticsPage';
// import AfterSalesPage from './components/AfterSalesPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/orderlist" element={<OrderList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
