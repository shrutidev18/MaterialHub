import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { VendorDashboard } from './pages/VendorDashboard';
import { SupplierDashboard } from './pages/SupplierDashboard';

type Page = 'home' | 'vendor' | 'supplier';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'vendor':
        return <VendorDashboard onNavigate={handleNavigate} />;
      case 'supplier':
        return <SupplierDashboard onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;