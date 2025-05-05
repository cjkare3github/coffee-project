"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, User, MoonStar, Sun, Search } from 'lucide-react';
import { useTheme } from 'next-themes';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  currentPath: string;
};

const MobileMenu = ({ isOpen, onClose, links, currentPath }: MobileMenuProps) => {
  const { theme, setTheme } = useTheme();
  
  const isActive = (path: string) => {
    if (path === '/' && currentPath !== '/') return false;
    return currentPath.startsWith(path);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-foreground"
        >
          <X size={24} />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <nav className="flex flex-col items-center space-y-6">
          {links.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className={`text-2xl font-medium ${
                  isActive(link.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-muted-foreground'
                }`}
                onClick={onClose}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <motion.div 
          className="flex justify-center gap-6 mt-12" 
          variants={itemVariants}
        >
          <Button variant="outline" size="icon" asChild>
            <Link href="/account" onClick={onClose}>
              <User size={20} />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button variant="outline" size="icon" asChild>
            <Link href="/search" onClick={onClose}>
              <Search size={20} />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;