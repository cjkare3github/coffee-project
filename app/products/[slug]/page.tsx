"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Coffee, 
  Leaf, 
  Thermometer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { getProductBySlug, getRelatedProducts, type Product, products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

// Add generateStaticParams function for static site generation
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    getProductBySlug(params.slug as string)
  );
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    currentProduct?.weight?.[0]
  );
  const [selectedGrind, setSelectedGrind] = useState<string | undefined>(
    currentProduct?.category === 'beans' ? 'Whole Bean' : undefined
  );
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem } = useCart();
  
  // If product not found, show error
  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }
  
  const relatedProducts = getRelatedProducts(currentProduct.id);
  
  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    addItem({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity,
      grind: selectedGrind,
      size: selectedSize
    });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < currentProduct.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex items-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{currentProduct.name}</span>
        </nav>
      </div>
      
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentProduct.images[selectedImage]}
                  alt={currentProduct.name}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex gap-3 mt-4">
            {currentProduct.images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image 
                  src={image} 
                  alt={`${currentProduct.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            {currentProduct.category && (
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {currentProduct.category}
              </div>
            )}
            
            <h1 className="text-3xl font-bold mb-2">{currentProduct.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted stroke-muted"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            
            <div className="text-2xl font-semibold mb-6">
              {formatPrice(currentProduct.price)}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {currentProduct.description}
            </p>
            
            {/* Product badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentProduct.new && (
                <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
              )}
              {currentProduct.bestseller && (
                <Badge className="bg-accent hover:bg-accent/90">Bestseller</Badge>
              )}
              {currentProduct.stock < 10 && (
                <Badge variant="outline" className="text-red-500 border-red-200">Low Stock</Badge>
              )}
            </div>
            
            {/* Coffee details */}
            {currentProduct.category === 'beans' || currentProduct.category === 'ground' ? (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {currentProduct.roastLevel && (
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground mb-1">Roast</div>
                    <div className="font-medium text-sm">{currentProduct.roastLevel.charAt(0).toUpperCase() + currentProduct.roastLevel.slice(1)}</div>
                  </div>
                )}
                {currentProduct.origin && (
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Leaf className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground mb-1">Origin</div>
                    <div className="font-medium text-sm line-clamp-1">{currentProduct.origin}</div>
                  </div>
                )}
                {currentProduct.flavor && (
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <Coffee className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground mb-1">Flavor</div>
                    <div className="font-medium text-sm line-clamp-1">{currentProduct.flavor.slice(0, 2).join(', ')}</div>
                  </div>
                )}
              </div>
            ) : null}
            
            {/* Product Options */}
            <div className="space-y-6">
              {/* Size selection */}
              {currentProduct.weight && currentProduct.weight.length > 0 && (
                <div>
                  <Label className="block mb-2">Size</Label>
                  <RadioGroup 
                    value={selectedSize} 
                    onValueChange={setSelectedSize} 
                    className="flex flex-wrap gap-3"
                  >
                    {currentProduct.weight.map((size) => (
                      <div key={size}>
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex px-4 py-2 rounded-md border cursor-pointer transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Grind selection */}
              {currentProduct.category === 'beans' && (
                <div>
                  <Label className="block mb-2">Grind</Label>
                  <Select value={selectedGrind} onValueChange={setSelectedGrind}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select grinding option" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProduct.grindOptions?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-none"
                    onClick={increaseQuantity}
                    disabled={quantity >= currentProduct.stock}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={currentProduct.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Stock status */}
              <div className="text-sm">
                {currentProduct.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({currentProduct.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Information Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="p-6 mt-2 border rounded-lg">
            <TabsContent value="description" className="space-y-4">
              <p>{currentProduct.details}</p>
              
              {currentProduct.flavor && (
                <div>
                  <h3 className="font-semibold mb-2">Flavor Profile</h3>
                  <ul className="flex flex-wrap gap-2">
                    {currentProduct.flavor.map((flavor) => (
                      <li key={flavor} className="px-3 py-1 rounded-full bg-muted text-sm">
                        {flavor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-4">Product Specifications</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1)}</span>
                    </li>
                    {currentProduct.roastLevel && (
                      <li className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Roast Level</span>
                        <span className="font-medium">{currentProduct.roastLevel.charAt(0).toUpperCase() + currentProduct.roastLevel.slice(1)}</span>
                      </li>
                    )}
                    {currentProduct.origin && (
                      <li className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Origin</span>
                        <span className="font-medium">{currentProduct.origin}</span>
                      </li>
                    )}
                    {currentProduct.weight && (
                      <li className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Available Sizes</span>
                        <span className="font-medium">{currentProduct.weight.join(', ')}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Shipping Information</h3>
                  <p className="text-muted-foreground mb-4">
                    We process orders within 24 hours, and all orders are shipped with tracking information.
                    Standard shipping typically takes 3-7 business days.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For international orders, please note that customs fees may apply depending on your location.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold mb-1">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted stroke-muted"}
                        />
                      ))}
                    </div>
                    <span className="text-sm">
                      4.0 out of 5 stars based on 24 reviews
                    </span>
                  </div>
                </div>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <Separator />
              
              {/* Sample reviews - in a real app, these would come from a database */}
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah L.",
                    date: "May 15, 2023",
                    rating: 5,
                    review: "This coffee is exceptional! The flavor notes are exactly as described, and the aroma is amazing. Will definitely buy again."
                  },
                  {
                    name: "Michael R.",
                    date: "April 3, 2023",
                    rating: 4,
                    review: "Really good coffee with complex flavors. I found the medium roast perfect for my morning brew. The only reason for 4 stars instead of 5 is that I would love if it came in larger sizes."
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= review.rating ? "text-amber-400 fill-amber-400" : "text-muted stroke-muted"}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.review}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}