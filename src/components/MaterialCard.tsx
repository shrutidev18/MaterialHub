import React from 'react';
import { Package, MapPin, Phone, Mail, Eye } from 'lucide-react';
import { Material } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface MaterialCardProps {
  material: Material;
  onViewDetails: (material: Material) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onViewDetails }) => {
  const { t } = useLanguage();

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
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{material.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{t(material.category)}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(material.availability)}`}>
              {t(material.availability)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(material.quality)}`}>
              {t(material.quality)}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">₹{material.price}</span>
            <span className="text-sm text-gray-500">per {t(material.unit)}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{material.location}</span>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">{t('supplier')}:</span> {material.supplier}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{material.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span className="truncate">{material.email}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(material)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{t('viewDetails')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};