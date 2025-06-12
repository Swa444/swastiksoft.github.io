import React from 'react';
import { 
  Users, 
  Package, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useCustomers } from '../contexts/CustomerContext';
import { useProducts } from '../contexts/ProductContext';
import { useInvoices } from '../contexts/InvoiceContext';

const Dashboard: React.FC = () => {
  const { customers } = useCustomers();
  const { products } = useProducts();
  const { invoices } = useInvoices();

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'sent').length;

  const stats = [
    {
      title: 'মোট কাস্টমার',
      titleEn: 'Total Customers',
      value: customers.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'মোট প্রোডাক্ট',
      titleEn: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-green-500',
      change: '+8%',
      isPositive: true,
    },
    {
      title: 'মোট ইনভয়েস',
      titleEn: 'Total Invoices',
      value: invoices.length,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+15%',
      isPositive: true,
    },
    {
      title: 'মোট আয়',
      titleEn: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+22%',
      isPositive: true,
    },
  ];

  const recentInvoices = invoices.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-600">আপনার ব্যবসার সারসংক্ষেপ</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('bn-BD')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="card-content p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {stat.titleEn}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    গত মাস থেকে
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">বিক্রয় চার্ট</h3>
            <p className="text-sm text-gray-600">গত ৭ দিনের বিক্রয়</p>
          </div>
          <div className="card-content">
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">চার্ট ডেটা লোড হচ্ছে...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">সাম্প্রতিক ইনভয়েস</h3>
            <p className="text-sm text-gray-600">সর্বশেষ ৫টি ইনভয়েস</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.customerName}</p>
                    <p className="text-sm text-gray-600">
                      {invoice.createdAt.toLocaleDateString('bn-BD')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">৳{invoice.total}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'sent'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status === 'paid' ? 'পেইড' : 
                       invoice.status === 'sent' ? 'পাঠানো' : 'ড্রাফট'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">দ্রুত অ্যাকশন</h3>
          <p className="text-sm text-gray-600">সাধারণ কাজগুলো দ্রুত করুন</p>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-primary btn-lg">
              <Users className="w-5 h-5 mr-2" />
              নতুন কাস্টমার যোগ করুন
            </button>
            <button className="btn btn-secondary btn-lg">
              <Package className="w-5 h-5 mr-2" />
              নতুন প্রোডাক্ট যোগ করুন
            </button>
            <button className="btn btn-outline btn-lg">
              <FileText className="w-5 h-5 mr-2" />
              নতুন ইনভয়েস তৈরি করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;