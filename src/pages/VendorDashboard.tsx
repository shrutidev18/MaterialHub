import React, { useState, useMemo } from 'react';
import { Search, Home, Users } from 'lucide-react';
import { MaterialCard } from '../components/MaterialCard';
import { MaterialDetailsModal } from '../components/MaterialDetailsModal';
import { FilterPanel } from '../components/FilterPanel';
import { LanguageSelector } from '../components/LanguageSelector';
import { materials } from '../data/materials';
import { Material } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface VendorDashboardProps {
  onNavigate: (page: 'home' | 'supplier') => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || material.category === selectedCategory;
      const matchesAvailability = !selectedAvailability || material.availability === selectedAvailability;
      const matchesQuality = !selectedQuality || material.quality === selectedQuality;
      const matchesLocation = !selectedLocation || material.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesAvailability && matchesQuality && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedAvailability, selectedQuality, selectedLocation]);

  const handleViewDetails = (material: Material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{t('vendorTitle')}</h1>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('vendorTitle')}</h2>
          <p className="text-gray-600">{t('vendorSubtitle')}</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              selectedCategory={selectedCategory}
              selectedAvailability={selectedAvailability}
              selectedQuality={selectedQuality}
              selectedLocation={selectedLocation}
              onCategoryChange={setSelectedCategory}
              onAvailabilityChange={setSelectedAvailability}
              onQualityChange={setSelectedQuality}
              onLocationChange={setSelectedLocation}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredMaterials.length} of {materials.length} materials
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredMaterials.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <MaterialDetailsModal
        material={selectedMaterial}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};