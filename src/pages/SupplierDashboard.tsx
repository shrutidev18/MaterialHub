import React, { useState } from 'react';
import { Home, Truck, Save, Package } from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { MaterialsTable } from '../components/MaterialsTable';
import { useLanguage } from '../hooks/useLanguage';
import { materials } from '../data/materials';
import { Material } from '../types';

interface SupplierDashboardProps {
  onNavigate: (page: 'home' | 'vendor') => void;
}

export const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [supplierMaterials, setSupplierMaterials] = useState<Material[]>(
    // Filter materials for current supplier (in real app, this would be based on logged-in user)
    materials.slice(0, 5)
  );
  const [formData, setFormData] = useState({
    materialName: '',
    category: '',
    price: '',
    unit: '',
    availability: '',
    quality: '',
    supplierName: '',
    location: '',
    phone: '+91 ',
    email: '',
    description: '',
    minOrder: '',
    maxOrder: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMaterial) {
      // Update existing material
      setSupplierMaterials(prev => 
        prev.map(material => 
          material.id === editingMaterial.id 
            ? { ...material, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
            : material
        )
      );
      alert('Material updated successfully!');
    } else {
      // Add new material
      const newMaterial: Material = {
        id: Date.now().toString(),
        name: formData.materialName,
        category: formData.category,
        price: parseFloat(formData.price),
        unit: formData.unit,
        availability: formData.availability as 'available' | 'limited' | 'out-of-stock',
        supplier: formData.supplierName,
        location: formData.location,
        description: formData.description,
        lastUpdated: new Date().toISOString().split('T')[0],
        phone: formData.phone,
        email: formData.email,
        minOrder: parseInt(formData.minOrder),
        maxOrder: parseInt(formData.maxOrder),
        quality: formData.quality as 'premium' | 'standard' | 'basic'
      };
      setSupplierMaterials(prev => [...prev, newMaterial]);
      alert('Material added successfully!');
    }
    
    // Reset form
    setFormData({
      materialName: '',
      category: '',
      price: '',
      unit: '',
      availability: '',
      quality: '',
      supplierName: '',
      location: '',
      phone: '+91 ',
      email: '',
      description: '',
      minOrder: '',
      maxOrder: ''
    });
    setShowForm(false);
    setEditingMaterial(null);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setFormData({
      materialName: material.name,
      category: material.category,
      price: material.price.toString(),
      unit: material.unit,
      availability: material.availability,
      quality: material.quality,
      supplierName: material.supplier,
      location: material.location,
      phone: material.phone,
      email: material.email,
      description: material.description,
      minOrder: material.minOrder.toString(),
      maxOrder: material.maxOrder.toString()
    });
    setShowForm(true);
  };

  const handleDelete = (materialId: string) => {
    setSupplierMaterials(prev => prev.filter(material => material.id !== materialId));
    alert('Material deleted successfully!');
  };

  const handleAddNew = () => {
    setEditingMaterial(null);
    setFormData({
      materialName: '',
      category: '',
      price: '',
      unit: '',
      availability: '',
      quality: '',
      supplierName: '',
      location: '',
      phone: '+91 ',
      email: '',
      description: '',
      minOrder: '',
      maxOrder: ''
    });
    setShowForm(true);
  };

  const categories = ['vegetables', 'fruits', 'grains', 'spices', 'dairy', 'meat'];
  const availabilities = ['available', 'limited', 'out-of-stock'];
  const qualities = ['premium', 'standard', 'basic'];
  const units = ['kg', 'ton', 'liter', 'piece', 'dozen', 'bag'];

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
                <div className="p-2 bg-green-600 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{t('supplierTitle')}</h1>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('supplierTitle')}</h2>
          <p className="text-gray-600">{t('supplierSubtitle')}</p>
        </div>

        <div className="space-y-8">
          <MaterialsTable
            materials={supplierMaterials}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAddNew}
          />

          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingMaterial ? t('updateMaterial') : 'Add New Material'}
                </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('materialName')} *
                </label>
                <input
                  type="text"
                  name="materialName"
                  value={formData.materialName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter material name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('category')} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {t(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('pricePerUnit')} (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit')} *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {t(unit)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('availability')} *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select availability</option>
                  {availabilities.map((availability) => (
                    <option key={availability} value={availability}>
                      {t(availability)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('quality')} *
                </label>
                <select
                  name="quality"
                  value={formData.quality}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select quality</option>
                  {qualities.map((quality) => (
                    <option key={quality} value={quality}>
                      {t(quality)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('supplierName')} *
                </label>
                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('phoneNumber')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('emailAddress')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="supplier@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('minimumOrder')} *
                </label>
                <input
                  type="number"
                  name="minOrder"
                  value={formData.minOrder}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Minimum quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('maximumOrder')} *
                </label>
                <input
                  type="number"
                  name="maxOrder"
                  value={formData.maxOrder}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Maximum quantity"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('materialDescription')} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your material, quality, and any special features..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                  <span>{editingMaterial ? t('updateListing') : 'Add Material'}</span>
              </button>
            </div>
          </form>
        </div>
          )}
        </div>
      </main>
    </div>
  );
};