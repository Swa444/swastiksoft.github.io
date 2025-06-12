import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'রহিম উদ্দিন',
      email: 'rahim@example.com',
      phone: '01712345678',
      address: 'ঢাকা, বাংলাদেশ',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'করিম আহমেদ',
      email: 'karim@example.com',
      phone: '01812345678',
      address: 'চট্টগ্রাম, বাংলাদেশ',
      createdAt: new Date('2024-01-20'),
    },
  ]);

  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, customerData: Partial<Customer>) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? { ...customer, ...customerData } : customer
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const getCustomer = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      getCustomer,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};