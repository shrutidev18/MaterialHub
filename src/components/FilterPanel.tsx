import React from 'react';
import { Filter } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface FilterPanelProps {
  selectedCategory: string;
  selectedAvailability: string;
  selectedQuality: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onAvailabilityChange: (availability: string) => void;
  onQualityChange: (quality: string) => void;
  onLocationChange: (location: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  selectedAvailability,
  selectedQuality,
  selectedLocation,
  onCategoryChange,
  onAvailabilityChange,
  onQualityChange,
  onLocationChange
}) => {
  const { t } = useLanguage();

  const categories = ['vegetables', 'fruits', 'grains', 'spices', 'dairy', 'meat'];
  const availabilities = ['available', 'limited', 'out-of-stock'];
  const qualities = ['premium', 'standard', 'basic'];
  const locations = [
    'Bangalore, Karnataka',
    'Amritsar, Punjab',
    'Guntur, Andhra Pradesh',
    'Mysore, Karnataka',
    'Ratnagiri, Maharashtra',
    'Coimbatore, Tamil Nadu',
    'Erode, Tamil Nadu',
    'Ludhiana, Punjab',
    'Pune, Maharashtra',
    'Kochi, Kerala'
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t('filter')}</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t('category')}</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {t(category)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t('availability')}</label>
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Availability</option>
            {availabilities.map((availability) => (
              <option key={availability} value={availability}>
                {t(availability)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t('quality')}</label>
          <select
            value={selectedQuality}
            onChange={(e) => onQualityChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Quality</option>
            {qualities.map((quality) => (
              <option key={quality} value={quality}>
                {t(quality)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t('location')}</label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};