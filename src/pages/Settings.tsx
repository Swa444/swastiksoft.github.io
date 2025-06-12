import React, { useState } from 'react';
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@swastiksoft.com',
    phone: '01712345678',
    address: 'ঢাকা, বাংলাদেশ',
  });

  const [companyData, setCompanyData] = useState({
    name: 'Swastik Soft',
    email: 'info@swastiksoft.com',
    phone: '01712345678',
    address: 'ঢাকা, বাংলাদেশ',
    website: 'www.swastiksoft.com',
    taxId: '123456789',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    invoiceReminders: true,
    paymentAlerts: true,
    lowStockAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'bn',
    currency: 'BDT',
    dateFormat: 'dd/mm/yyyy',
    theme: 'light',
  });

  const tabs = [
    { id: 'profile', label: 'প্রোফাইল', icon: User },
    { id: 'company', label: 'কোম্পানি', icon: Building },
    { id: 'notifications', label: 'নোটিফিকেশন', icon: Bell },
    { id: 'preferences', label: 'পছন্দসমূহ', icon: Palette },
    { id: 'security', label: 'নিরাপত্তা', icon: Shield },
  ];

  const handleSave = () => {
    // Save settings logic here
    alert('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">সেটিংস</h1>
          <p className="text-gray-600">আপনার অ্যাকাউন্ট ও অ্যাপ্লিকেশন সেটিংস পরিচালনা করুন</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary btn-md">
          <Save className="w-4 h-4 mr-2" />
          সংরক্ষণ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-content p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="card-content p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">প্রোফাইল তথ্য</h3>
                    
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-teal-600" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md border">
                          <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{profileData.name}</h4>
                        <p className="text-gray-600">{profileData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ইমেইল
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ফোন
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ঠিকানা
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">কোম্পানির তথ্য</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        কোম্পানির নাম
                      </label>
                      <input
                        type="text"
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ইমেইল
                      </label>
                      <input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ফোন
                      </label>
                      <input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ওয়েবসাইট
                      </label>
                      <input
                        type="url"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ঠিকানা
                      </label>
                      <textarea
                        value={companyData.address}
                        onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                        className="input min-h-[80px] resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ট্যাক্স আইডি
                      </label>
                      <input
                        type="text"
                        value={companyData.taxId}
                        onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">নোটিফিকেশন সেটিংস</h3>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {key === 'emailNotifications' && 'ইমেইল নোটিফিকেশন'}
                            {key === 'smsNotifications' && 'SMS নোটিফিকেশন'}
                            {key === 'invoiceReminders' && 'ইনভয়েস রিমাইন্ডার'}
                            {key === 'paymentAlerts' && 'পেমেন্ট অ্যালার্ট'}
                            {key === 'lowStockAlerts' && 'কম স্টক অ্যালার্ট'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'emailNotifications' && 'ইমেইলের মাধ্যমে নোটিফিকেশন পান'}
                            {key === 'smsNotifications' && 'SMS এর মাধ্যমে নোটিফিকেশন পান'}
                            {key === 'invoiceReminders' && 'ইনভয়েস মেয়াদের রিমাইন্ডার পান'}
                            {key === 'paymentAlerts' && 'পেমেন্ট সংক্রান্ত অ্যালার্ট পান'}
                            {key === 'lowStockAlerts' && 'প্রোডাক্ট স্টক কম হলে অ্যালার্ট পান'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">পছন্দসমূহ</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ভাষা
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="input"
                      >
                        <option value="bn">বাংলা</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        মুদ্রা
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        className="input"
                      >
                        <option value="BDT">BDT (৳)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        তারিখ ফরম্যাট
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                        className="input"
                      >
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        থিম
                      </label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                        className="input"
                      >
                        <option value="light">হালকা</option>
                        <option value="dark">গাঢ়</option>
                        <option value="auto">অটো</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">নিরাপত্তা সেটিংস</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">পাসওয়ার্ড পরিবর্তন</h4>
                      <p className="text-sm text-yellow-700 mb-4">
                        নিরাপত্তার জন্য নিয়মিত পাসওয়ার্ড পরিবর্তন করুন
                      </p>
                      <button className="btn btn-outline btn-sm">
                        পাসওয়ার্ড পরিবর্তন করুন
                      </button>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">টু-ফ্যাক্টর অথেনটিকেশন</h4>
                      <p className="text-sm text-blue-700 mb-4">
                        অতিরিক্ত নিরাপত্তার জন্য 2FA সক্রিয় করুন
                      </p>
                      <button className="btn btn-outline btn-sm">
                        2FA সেটআপ করুন
                      </button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">ব্যাকআপ ও রিস্টোর</h4>
                      <p className="text-sm text-green-700 mb-4">
                        আপনার ডেটার নিয়মিত ব্যাকআপ নিন
                      </p>
                      <div className="flex space-x-3">
                        <button className="btn btn-outline btn-sm">
                          ব্যাকআপ তৈরি করুন
                        </button>
                        <button className="btn btn-outline btn-sm">
                          রিস্টোর করুন
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;