"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/products/ProductCard';
import { products, type Product } from '@/data/products';

// Product category types for filtering
type Category = 'all' | 'beans' | 'ground' | 'instant' | 'accessories';
type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';
type RoastLevel = 'light' | 'medium' | 'dark';

export default function ProductsPage() {
  // Filter and sort state
  const [category, setCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [roastLevels, setRoastLevels] = useState<RoastLevel[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (category !== 'all' && product.category !== category) return false;
    
    // Filter by roast level (if applicable and selected)
    if (
      roastLevels.length > 0 && 
      product.roastLevel && 
      !roastLevels.includes(product.roastLevel)
    ) return false;
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.new ? -1 : b.new ? 1 : 0;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
      default:
        return a.featured ? -1 : b.featured ? 1 : 0;
    }
  });
  
  // Handle roast level filter changes
  const handleRoastLevelChange = (level: RoastLevel) => {
    setRoastLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setCategory('all');
    setRoastLevels([]);
    setPriceRange([0, 100]);
    setSortBy('featured');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Header */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Coffee Products</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our range of premium Tanzanian coffee beans, ground coffee, and accessories. 
            Each product is carefully selected and processed to deliver exceptional flavor.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Button */}
          <Button 
            variant="outline" 
            className="md:hidden flex items-center justify-center gap-2 mb-4"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
          
          {/* Mobile Filters Overlay */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div 
                  className="fixed inset-0 bg-black/60 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  className="fixed inset-y-0 left-0 w-[80%] max-w-xs bg-background z-50 p-6 overflow-y-auto"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  
                  {/* Mobile filters content (same as desktop) */}
                  <div className="space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {['all', 'beans', 'ground', 'instant', 'accessories'].map((cat) => (
                          <button
                            key={cat}
                            className={`block text-sm px-3 py-1.5 rounded-md w-full text-left ${
                              category === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted'
                            }`}
                            onClick={() => setCategory(cat as Category)}
                          >
                            {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Roast Level */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Roast Level</h3>
                      <div className="space-y-2">
                        {['light', 'medium', 'dark'].map((roast) => (
                          <div key={roast} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`roast-${roast}-mobile`} 
                              checked={roastLevels.includes(roast as RoastLevel)}
                              onCheckedChange={() => handleRoastLevelChange(roast as RoastLevel)}
                            />
                            <label 
                              htmlFor={`roast-${roast}-mobile`}
                              className="text-sm cursor-pointer"
                            >
                              {roast.charAt(0).toUpperCase() + roast.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Clear Filters */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {['all', 'beans', 'ground', 'instant', 'accessories'].map((cat) => (
                      <button
                        key={cat}
                        className={`block text-sm px-3 py-1.5 rounded-md w-full text-left ${
                          category === cat
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                        onClick={() => setCategory(cat as Category)}
                      >
                        {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Roast Level */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Roast Level</h3>
                  <div className="space-y-2">
                    {['light', 'medium', 'dark'].map((roast) => (
                      <div key={roast} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`roast-${roast}`} 
                          checked={roastLevels.includes(roast as RoastLevel)}
                          onCheckedChange={() => handleRoastLevelChange(roast as RoastLevel)}
                        />
                        <label 
                          htmlFor={`roast-${roast}`}
                          className="text-sm cursor-pointer"
                        >
                          {roast.charAt(0).toUpperCase() + roast.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground text-sm">
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}