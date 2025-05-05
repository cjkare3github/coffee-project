import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function generateOrderId(): string {
  const prefix = 'EC';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

export function getDeliveryEstimate(): { min: number; max: number } {
  // Calculate delivery estimate (3-7 days from now)
  return { min: 3, max: 7 };
}

// Simple progress statuses for order tracking
export const ORDER_STATUSES = [
  'Order Placed',
  'Processing',
  'Roasting',
  'Packaging',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

// For order tracking progress bar percentage calculation
export function calculateOrderProgress(status: string): number {
  const index = ORDER_STATUSES.indexOf(status);
  if (index === -1) return 0;
  return Math.round((index / (ORDER_STATUSES.length - 1)) * 100);
}