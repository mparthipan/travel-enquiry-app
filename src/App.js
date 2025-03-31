// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import PassportApplicationPage from './Pages/QuickLinkDrawer/passport';
import Footer from './Pages/Footer';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/passportService" element={<PassportApplicationPage />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  );
};

export default App;
