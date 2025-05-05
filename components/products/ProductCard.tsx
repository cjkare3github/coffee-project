"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { type Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div 
      className="group relative bg-card rounded-lg overflow-hidden shadow-sm product-card-hover"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.new && (
          <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
        )}
        {product.bestseller && (
          <Badge className="bg-accent hover:bg-accent/90">Bestseller</Badge>
        )}
      </div>
      
      {/* Product image */}
      <Link href={`/products/${product.slug}`} className="block aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </Link>
      
      {/* Quick add button (appears on hover) */}
      <div className="absolute right-3 bottom-[5.5rem] z-10 transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <Button size="icon" aria-label="Add to cart">
          <ShoppingCart size={18} />
        </Button>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </div>
        
        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted stroke-muted"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">(24)</span>
        </div>
        
        {/* Price */}
        <div className="mt-2 font-semibold">
          {formatPrice(product.price)}
        </div>
        
        {/* Brief description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;