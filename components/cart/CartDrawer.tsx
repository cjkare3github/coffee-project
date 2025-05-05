"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart, CartItem } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  
  // Animation variants
  const drawerVariants = {
    hidden: { x: '100%', opacity: 1 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 }
    },
    exit: { 
      x: '100%', 
      opacity: 1,
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.2 }
    }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-background z-50 shadow-xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="py-4 px-5 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <h2 className="font-semibold text-lg">Your Cart</h2>
                <span className="bg-muted text-muted-foreground text-sm px-2 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            {/* Cart Content */}
            {items.length > 0 ? (
              <>
                <ScrollArea className="flex-1 h-[calc(100vh-13.5rem)]">
                  <div className="px-5 py-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <CartItem key={`${item.id}-${item.grind}-${item.size}`} item={item} />
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
                
                {/* Summary */}
                <div className="border-t px-5 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(getTotal())}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    <Button 
                      asChild
                      className="w-full"
                    >
                      <Link href="/checkout" onClick={onClose}>
                        Checkout
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-5 text-center">
                <ShoppingCart size={64} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping to add items to your cart
                </p>
                <Button asChild>
                  <Link href="/products" onClick={onClose}>
                    Browse Products
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Individual cart item component
const CartItem = ({ item }: { item: CartItem }) => {
  const { removeItem, updateQuantity } = useCart();
  
  return (
    <motion.div 
      className="flex gap-4 py-3 border-b last:border-0"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <div className="w-20 h-20 relative rounded-md overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium line-clamp-1">{item.name}</h4>
            <div className="text-sm text-muted-foreground mt-1">
              {item.size && <span className="mr-2">{item.size}</span>}
              {item.grind && <span>{item.grind}</span>}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          <span className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CartDrawer;