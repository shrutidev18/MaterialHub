import React from 'react';
import { Package, Users, Truck, ArrowRight } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../hooks/useLanguage';

interface HomePageProps {
  onNavigate: (page: 'vendor' | 'supplier') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t('welcomeTitle')}</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('welcomeTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('welcomeSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('vendorDashboard')}</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('vendorSubtitle')}
              </p>
              <button
                onClick={() => onNavigate('vendor')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-105"
              >
                <span className="font-semibold">{t('accessVendor')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('supplierDashboard')}</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('supplierSubtitle')}
              </p>
              <button
                onClick={() => onNavigate('supplier')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-105"
              >
                <span className="font-semibold">{t('accessSupplier')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Live Material Tracking</h4>
              <p className="text-gray-600">Real-time updates on material availability and pricing</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Direct Communication</h4>
              <p className="text-gray-600">Connect directly with suppliers and vendors</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Efficient Sourcing</h4>
              <p className="text-gray-600">Streamlined material sourcing and procurement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};