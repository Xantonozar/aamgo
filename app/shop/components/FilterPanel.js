"use client";

import { useState, useEffect, useContext } from 'react';
import { FilterContext } from './ProductGrid';
import { CheckIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';

const categories = [
  { id: 'seasonal', name: 'Seasonal', count: 24 },
];

const priceRanges = [
  { id: 'under-1k', label: 'Under BDT 1,000', min: 0, max: 2000 },
  { id: '1k-2k', label: 'BDT 1,000 - BDT 2,000', min: 1000, max: 2000 },
  { id: '2k-3k', label: 'BDT 2,000 - BDT 3,000', min: 2000, max: 3000 },
  { id: '3k-plus', label: 'Over BDT 3,000', min: 3000, max: 5000 },
];

const ratings = [5, 4, 3, 2, 1];

const attributes = [
  { id: 'gluten-free', name: 'Gluten Free' },
];

const origins = [
  { id: 'Rajshahi', name: 'Rajshahi' },
  { id: 'Naogaon', name: 'Naogaon' },
  { id: 'Chapai Nawabganj', name: 'Chapai Nawabganj' },
];

// const badges = [
//   { id: 'Early Season', name: 'Early Season' },
//   { id: 'Hybrid', name: 'Hybrid' },
//   { id: 'Mid Season', name: 'Mid Season' },
//   { id: 'Traditional', name: 'Traditional' },
//   { id: 'Late Season', name: 'Late Season' },
//   { id: 'GI Certified', name: 'GI Certified' },
// ];

const amounts = [12, 23, 46];

export default function FilterPanel() {
  // Use the shared FilterContext instead of local state
  const {
    selectedCategories, setSelectedCategories,
    selectedPriceRanges, setSelectedPriceRanges,
    selectedRatings, setSelectedRatings,
    selectedAttributes, setSelectedAttributes,
    selectedOrigins, setSelectedOrigins,
    priceRange, setPriceRange,
    selectedAmounts, setSelectedAmounts,
    clearAllFilters
  } = useContext(FilterContext);
  
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    attributes: true,
    origins: true,
    amounts: true,
  });
  
  // Count active filters for UI display
  const activeFilterCount = 
    selectedCategories.length + 
    selectedPriceRanges.length + 
    selectedRatings.length + 
    selectedAttributes.length +
    selectedOrigins.length +
    selectedAmounts.length;
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
    triggerFilterAnimation();
  };

  // Toggle price range selection
  const togglePriceRange = (rangeId) => {
    if (selectedPriceRanges.includes(rangeId)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(id => id !== rangeId));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, rangeId]);
    }
    triggerFilterAnimation();
  };

  // Toggle rating selection
  const toggleRating = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
    triggerFilterAnimation();
  };

  // Toggle attribute selection
  const toggleAttribute = (attributeId) => {
    if (selectedAttributes.includes(attributeId)) {
      setSelectedAttributes(selectedAttributes.filter(id => id !== attributeId));
    } else {
      setSelectedAttributes([...selectedAttributes, attributeId]);
    }
    triggerFilterAnimation();
  };
  
  // Toggle origin selection
  const toggleOrigin = (originId) => {
    if (selectedOrigins.includes(originId)) {
      setSelectedOrigins(selectedOrigins.filter(id => id !== originId));
    } else {
      setSelectedOrigins([...selectedOrigins, originId]);
    }
    triggerFilterAnimation();
  };

  // Toggle amount selection
  const toggleAmount = (amount) => {
    if (selectedAmounts.includes(amount)) {
      setSelectedAmounts(selectedAmounts.filter(a => a !== amount));
    } else {
      setSelectedAmounts([...selectedAmounts, amount]);
    }
    triggerFilterAnimation();
  };

  // Handle price range input change
  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    
    // Ensure min is not greater than max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    setPriceRange(newRange);
    triggerFilterAnimation();
  };
  
  // Trigger filter change animation 
  const [filterChanged, setFilterChanged] = useState(false);
  
  const triggerFilterAnimation = () => {
    setFilterChanged(true);
    setTimeout(() => setFilterChanged(false), 500);
  };
  
  // Get all active filters for UI display
  const getActiveFilters = () => {
    const filters = [];
    
    // Add categories
    selectedCategories.forEach(catId => {
      const category = categories.find(c => c.id === catId);
      if (category) {
        filters.push({
          id: `cat-${catId}`,
          label: category.name,
          type: 'category',
          onRemove: () => toggleCategory(catId)
        });
      }
    });
    
    // Add price ranges
    selectedPriceRanges.forEach(rangeId => {
      const range = priceRanges.find(r => r.id === rangeId);
      if (range) {
        filters.push({
          id: `price-${rangeId}`,
          label: range.label,
          type: 'price',
          onRemove: () => togglePriceRange(rangeId)
        });
      }
    });
    
    // Add ratings
    selectedRatings.forEach(rating => {
      filters.push({
        id: `rating-${rating}`,
        label: `${rating}★ & Up`,
        type: 'rating',
        onRemove: () => toggleRating(rating)
      });
    });
    
    // Add attributes
    selectedAttributes.forEach(attrId => {
      const attr = attributes.find(a => a.id === attrId);
      if (attr) {
        filters.push({
          id: `attr-${attrId}`,
          label: attr.name,
          type: 'attribute',
          onRemove: () => toggleAttribute(attrId)
        });
      }
    });
    
    // Add origins
    selectedOrigins.forEach(originId => {
      const origin = origins.find(o => o.id === originId);
      if (origin) {
        filters.push({
          id: `origin-${originId}`,
          label: origin.name,
          type: 'origin',
          onRemove: () => toggleOrigin(originId)
        });
      }
    });
    
    // Add amounts
    selectedAmounts.forEach(amount => {
      filters.push({
        id: `amount-${amount}`,
        label: `${amount}kg`,
        type: 'amount',
        onRemove: () => toggleAmount(amount)
      });
    });
    
    return filters;
  };
  
  // Render star rating
  const renderStars = (count) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ${i < count ? 'text-[#FDBE02] fill-[#FDBE02]' : 'text-gray-300'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  // Update active filters on DOM when they change
  useEffect(() => {
    const activeFiltersContainer = document.querySelector('[data-active-filters]');
    if (!activeFiltersContainer) return;
    
    // Clear existing filters
    activeFiltersContainer.innerHTML = '';
    
    // Get active filters
    const filters = getActiveFilters();
    
    if (filters.length === 0) return;
    
    // Add title if there are filters
    const titleEl = document.createElement('div');
    titleEl.className = 'flex items-center mr-3 mb-2';
    titleEl.innerHTML = `
      <span class="font-medium text-gray-700 mr-2">Active Filters:</span>
      <button class="text-[#f57f17] text-sm hover:underline" data-clear-filters>Clear All</button>
    `;
    activeFiltersContainer.appendChild(titleEl);
    
    // Add filter chips
    filters.forEach(filter => {
      const chip = document.createElement('div');
      chip.className = 'bg-[#f8f4e9] text-[#f57f17] rounded-full px-3 py-1 text-sm font-medium flex items-center mb-2 mr-2';
      chip.dataset.filterId = filter.id;
      chip.innerHTML = `
        <span>${filter.label}</span>
        <button class="ml-2 text-[#f57f17] hover:text-[#e65100]" data-remove-filter="${filter.id}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      `;
      activeFiltersContainer.appendChild(chip);
      
      // Add event listener to remove button
      const removeBtn = chip.querySelector(`[data-remove-filter="${filter.id}"]`);
      if (removeBtn) {
        removeBtn.addEventListener('click', filter.onRemove);
      }
    });
    
    // Add event listener to clear all button
    const clearBtn = activeFiltersContainer.querySelector('[data-clear-filters]');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAllFilters);
    }
  }, [selectedCategories, selectedPriceRanges, selectedRatings, selectedAttributes, selectedOrigins, selectedAmounts]);
  
  return (
    <div className={`filter-panel ${filterChanged ? 'animate-pulse' : ''}`}>
      {/* Filter Panel Header with total count */}
      {activeFilterCount > 0 && (
        <div className="mb-6 flex justify-between items-center">
          <span className="font-medium text-gray-500">
            {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} applied
          </span>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-[#f57f17] hover:text-[#e65100] font-medium"
          >
            Clear All
          </button>
        </div>
      )}
      
      {/* Categories */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <span>
            {expandedSections.categories ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2 mt-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="flex items-center"
              >
                <button
                  className={`flex items-center justify-between w-full py-1.5 px-2 rounded-lg transition-colors ${
                    selectedCategories.includes(category.id) 
                      ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                      selectedCategories.includes(category.id) 
                        ? 'bg-[#f57f17] text-white' 
                        : 'border border-gray-300'
                    }`}>
                      {selectedCategories.includes(category.id) && (
                        <CheckIcon className="h-3 w-3" />
                      )}
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">({category.count})</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Price</h3>
          <span>
            {expandedSections.price ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        
        {expandedSections.price && (
          <div className="space-y-4 mt-3">
            {/* Price Range Slider */}
            <div className="px-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">BDT {priceRange[0]}</span>
                <span className="text-gray-600 text-sm">BDT {priceRange[1]}</span>
              </div>
              
              <div className="relative h-1 bg-gray-200 rounded-full mb-5">
                <div 
                  className="absolute h-1 bg-[#FDBE02] rounded-full"
                  style={{
                    left: `${(priceRange[0] / 50000) * 100}%`,
                    right: `${100 - (priceRange[1] / 50000) * 100}%`
                  }}
                ></div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  value={priceRange[0]} 
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  style={{zIndex: 1}}
                />
                
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  value={priceRange[1]} 
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  style={{zIndex: 1}}
                />
              </div>
            </div>
            
            {/* Predefined Price Ranges */}
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div 
                  key={range.id}
                  className="flex items-center"
                >
                  <button
                    className={`flex items-center w-full py-1.5 px-2 rounded-lg transition-colors ${
                      selectedPriceRanges.includes(range.id) 
                        ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => togglePriceRange(range.id)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                      selectedPriceRanges.includes(range.id) 
                        ? 'bg-[#f57f17] text-white' 
                        : 'border border-gray-300'
                    }`}>
                      {selectedPriceRanges.includes(range.id) && (
                        <CheckIcon className="h-3 w-3" />
                      )}
                    </div>
                    <span>{range.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Customer Rating */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Customer Rating</h3>
          <span>
            {expandedSections.rating ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2 mt-3">
            {ratings.map((rating) => (
              <div 
                key={rating}
                className="flex items-center"
              >
                <button
                  className={`flex items-center w-full py-1.5 px-2 rounded-lg transition-colors ${
                    selectedRatings.includes(rating) 
                      ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => toggleRating(rating)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                    selectedRatings.includes(rating) 
                      ? 'bg-[#f57f17] text-white' 
                      : 'border border-gray-300'
                  }`}>
                    {selectedRatings.includes(rating) && (
                      <CheckIcon className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                    <span className="ml-1">& Up</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Attributes (Organic, etc.) */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('attributes')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Attributes</h3>
          <span>
            {expandedSections.attributes ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        
        {expandedSections.attributes && (
          <div className="space-y-2 mt-3">
            {attributes.map((attribute) => (
              <div 
                key={attribute.id}
                className="flex items-center"
              >
                <button
                  className={`flex items-center w-full py-1.5 px-2 rounded-lg transition-colors ${
                    selectedAttributes.includes(attribute.id) 
                      ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => toggleAttribute(attribute.id)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                    selectedAttributes.includes(attribute.id) 
                      ? 'bg-[#f57f17] text-white' 
                      : 'border border-gray-300'
                  }`}>
                    {selectedAttributes.includes(attribute.id) && (
                      <CheckIcon className="h-3 w-3" />
                    )}
                  </div>
                  <span>{attribute.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Origins */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('origins')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Country of Origin</h3>
          <span>
            {expandedSections.origins ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        
        {expandedSections.origins && (
          <div className="space-y-2 mt-3">
            {origins.map((origin) => (
              <div 
                key={origin.id}
                className="flex items-center"
              >
                <button
                  className={`flex items-center w-full py-1.5 px-2 rounded-lg transition-colors ${
                    selectedOrigins.includes(origin.id) 
                      ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => toggleOrigin(origin.id)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                    selectedOrigins.includes(origin.id) 
                      ? 'bg-[#f57f17] text-white' 
                      : 'border border-gray-300'
                  }`}>
                    {selectedOrigins.includes(origin.id) && (
                      <CheckIcon className="h-3 w-3" />
                    )}
                  </div>
                  <span>{origin.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Amount Filter */}
      <div className="border-b border-gray-200 pb-5 mb-5">
        <button 
          className="flex items-center justify-between w-full mb-3"
          onClick={() => toggleSection('amounts')}
        >
          <h3 className="text-lg font-semibold text-gray-800">Amount</h3>
          <span>
            {expandedSections.amounts ? 
              <MinusIcon className="h-5 w-5 text-gray-500" /> : 
              <PlusIcon className="h-5 w-5 text-gray-500" />
            }
          </span>
        </button>
        {expandedSections.amounts && (
          <div className="space-y-2 mt-3">
            {amounts.map((amount) => (
              <div key={amount} className="flex items-center">
                <button
                  className={`flex items-center w-full py-1.5 px-2 rounded-lg transition-colors ${
                    selectedAmounts.includes(amount) 
                      ? 'bg-[#FDBE02]/10 text-[#f57f17]' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => toggleAmount(amount)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                    selectedAmounts.includes(amount) 
                      ? 'bg-[#f57f17] text-white' 
                      : 'border border-gray-300'
                  }`}>
                    {selectedAmounts.includes(amount) && (
                      <CheckIcon className="h-3 w-3" />
                    )}
                  </div>
                  <span>{amount}kg</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}