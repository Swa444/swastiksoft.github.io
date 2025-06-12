import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { CustomerProvider } from './contexts/CustomerContext';
import { ProductProvider } from './contexts/ProductContext';
import { InvoiceProvider } from './contexts/InvoiceContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CustomerProvider>
      <ProductProvider>
        <InvoiceProvider>
          <Router>
            <div className="flex h-screen bg-gray-100">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </InvoiceProvider>
      </ProductProvider>
    </CustomerProvider>
  );
}

export default App;