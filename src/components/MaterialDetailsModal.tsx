import React from 'react';
import { X, Package, MapPin, Phone, Mail, Calendar, ShoppingCart } from 'lucide-react';
import { Material } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface MaterialDetailsModalProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialDetailsModal: React.FC<MaterialDetailsModalProps> = ({
  material,
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();

  if (!isOpen || !material) return null;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{t('materialDetails')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{material.name}</h3>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium capitalize">
                  {t(material.category)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(material.availability)}`}>
                  {t(material.availability)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(material.quality)}`}>
                  {t(material.quality)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{material.location}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-1">₹{material.price}</div>
                <div className="text-sm text-green-700">per {t(material.unit)}</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t('minOrder')}:</span>
                  <span className="font-semibold">{material.minOrder} {t(material.unit)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{t('maxOrder')}:</span>
                  <span className="font-semibold">{material.maxOrder} {t(material.unit)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">{t('lastUpdated')}:</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold">{material.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">{t('supplier')}</h4>
                <p className="text-blue-800 font-medium">{material.supplier}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">{t('phone')}</div>
                    <div className="font-semibold">{material.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">{t('email')}</div>
                    <div className="font-semibold">{material.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">{t('description')}</h4>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {material.description}
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>{t('contactSupplier')}</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};