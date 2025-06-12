import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Users,
  Package,
  FileText
} from 'lucide-react';
import { useInvoices } from '../contexts/InvoiceContext';
import { useCustomers } from '../contexts/CustomerContext';
import { useProducts } from '../contexts/ProductContext';

const Reports: React.FC = () => {
  const { invoices } = useInvoices();
  const { customers } = useCustomers();
  const { products } = useProducts();
  const [dateRange, setDateRange] = useState('30');

  // Calculate metrics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');
  const paidRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingRevenue = invoices
    .filter(invoice => invoice.status === 'sent')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  // Top selling products
  const productSales = invoices.reduce((acc, invoice) => {
    invoice.items.forEach(item => {
      if (acc[item.productId]) {
        acc[item.productId].quantity += item.quantity;
        acc[item.productId].revenue += item.total;
      } else {
        acc[item.productId] = {
          name: item.productName,
          quantity: item.quantity,
          revenue: item.total,
        };
      }
    });
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Top customers
  const customerSales = invoices.reduce((acc, invoice) => {
    if (acc[invoice.customerId]) {
      acc[invoice.customerId].total += invoice.total;
      acc[invoice.customerId].invoiceCount += 1;
    } else {
      acc[invoice.customerId] = {
        name: invoice.customerName,
        total: invoice.total,
        invoiceCount: 1,
      };
    }
    return acc;
  }, {} as Record<string, { name: string; total: number; invoiceCount: number }>);

  const topCustomers = Object.values(customerSales)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Monthly sales data (mock data for chart)
  const monthlySales = [
    { month: 'জানুয়ারি', sales: 45000 },
    { month: 'ফেব্রুয়ারি', sales: 52000 },
    { month: 'মার্চ', sales: 48000 },
    { month: 'এপ্রিল', sales: 61000 },
    { month: 'মে', sales: 55000 },
    { month: 'জুন', sales: 67000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">রিপোর্ট ও অ্যানালিটিক্স</h1>
          <p className="text-gray-600">আপনার ব্যবসার বিস্তারিত বিশ্লেষণ</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input"
          >
            <option value="7">গত ৭ দিন</option>
            <option value="30">গত ৩০ দিন</option>
            <option value="90">গত ৯০ দিন</option>
            <option value="365">গত ১ বছর</option>
          </select>
          <button className="btn btn-outline btn-md">
            <Download className="w-4 h-4 mr-2" />
            এক্সপোর্ট
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">মোট আয়</p>
                <p className="text-2xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">পেইড আয়</p>
                <p className="text-2xl font-bold text-gray-900">৳{paidRevenue.toLocaleString()}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">পেন্ডিং আয়</p>
                <p className="text-2xl font-bold text-gray-900">৳{pendingRevenue.toLocaleString()}</p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  অপেক্ষমাণ
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">গড় অর্ডার মূল্য</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{invoices.length > 0 ? (totalRevenue / invoices.length).toFixed(0) : 0}
                </p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  +5.1%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">মাসিক বিক্রয়</h3>
            <p className="text-sm text-gray-600">গত ৬ মাসের বিক্রয় ট্রেন্ড</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {monthlySales.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${(data.sales / 70000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                      ৳{(data.sales / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">ইনভয়েস স্ট্যাটাস</h3>
            <p className="text-sm text-gray-600">বর্তমান ইনভয়েসের অবস্থা</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">পেইড</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {invoices.filter(i => i.status === 'paid').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">পাঠানো</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {invoices.filter(i => i.status === 'sent').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">ড্রাফট</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {invoices.filter(i => i.status === 'draft').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">মেয়াদোত্তীর্ণ</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {invoices.filter(i => i.status === 'overdue').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">শীর্ষ বিক্রিত প্রোডাক্ট</h3>
            <p className="text-sm text-gray-600">সবচেয়ে বেশি বিক্রিত প্রোডাক্ট</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-teal-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.quantity} বিক্রি</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">৳{product.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">শীর্ষ কাস্টমার</h3>
            <p className="text-sm text-gray-600">সবচেয়ে বেশি কেনাকাটা করা কাস্টমার</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.invoiceCount} অর্ডার</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">৳{customer.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;