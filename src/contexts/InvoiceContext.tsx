import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: Date;
  dueDate: Date;
}

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoice: (id: string) => Invoice | undefined;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'রহিম উদ্দিন',
      items: [
        {
          productId: '1',
          productName: 'চাল',
          quantity: 2,
          price: 65,
          total: 130,
        },
        {
          productId: '2',
          productName: 'ডাল',
          quantity: 1,
          price: 120,
          total: 120,
        },
      ],
      subtotal: 250,
      tax: 25,
      total: 275,
      status: 'paid',
      createdAt: new Date('2024-01-25'),
      dueDate: new Date('2024-02-25'),
    },
  ]);

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const updateInvoice = (id: string, invoiceData: Partial<Invoice>) => {
    setInvoices(prev =>
      prev.map(invoice =>
        invoice.id === id ? { ...invoice, ...invoiceData } : invoice
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== id));
  };

  const getInvoice = (id: string) => {
    return invoices.find(invoice => invoice.id === id);
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      getInvoice,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};