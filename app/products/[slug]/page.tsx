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
import { getProductBySlug, getRelatedProducts, type Product } from '@/data/products';
import { formatPrice } from '@/lib/utils';

// Mock product slugs for static generation
// Add your actual product slugs here or use a simple set of mock slugs
const mockProductSlugs = [
  'ethiopia-yirgacheffe',
  'colombia-supremo',
  'brazil-santos',
  'guatemala-antigua',
  'kenya-aa',
  'costa-rica-tarrazu',
  'sumatra-mandheling',
  'french-roast-blend',
  'espresso-blend',
  'decaf-colombian'
];

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Return mock product slugs for static generation
  return mockProductSlugs.map(slug => ({
    slug: slug,
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
    router.push('/cart');
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
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'}`}
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

            <div className="space-y-6">
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
                  Add to Cart & Checkout
                </Button>
              </div>

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
    </div>
  );
}