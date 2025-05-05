"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Coffee, ShoppingBag, Truck, Award } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { featuredProducts } from '@/data/products';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';

export default function Home() {
  // Animation references
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 });
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  // Fade-in animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/539432/pexels-photo-539432.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: heroY,
            opacity: heroOpacity
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="block">Experience the Finest</span>
              <span className="font-playfair italic text-amber-400">Tanzanian Coffee</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Handpicked beans from the slopes of Mount Kilimanjaro, roasted to perfection and delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/products">
                  Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/about">
                  Our Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight size={30} className="text-white rotate-90" />
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Coffee className="h-10 w-10 text-primary" />, 
                title: "Premium Quality", 
                description: "Sourced from Tanzania's finest coffee regions" 
              },
              { 
                icon: <Award className="h-10 w-10 text-primary" />, 
                title: "Award Winning", 
                description: "Recognized for exceptional taste and quality" 
              },
              { 
                icon: <Truck className="h-10 w-10 text-primary" />, 
                title: "Fast Delivery", 
                description: "Worldwide shipping with tracking available" 
              },
              { 
                icon: <ShoppingBag className="h-10 w-10 text-primary" />, 
                title: "Secure Checkout", 
                description: "Safe and reliable payment options" 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 flex flex-col items-center text-center shadow-sm"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section ref={featuredRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.p variants={itemVariants} className="text-accent font-medium mb-3">
              Our Collection
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Featured Coffee Products
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium coffee beans, each with a unique flavor profile and carefully roasted to bring out the best qualities.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="hidden"
                animate={featuredInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/2159146/pexels-photo-2159146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Coffee plantation in Tanzania"
                width={600}
                height={700}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white font-playfair text-2xl">Est. 2025</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
            >
              <motion.p variants={itemVariants} className="text-accent font-medium mb-3">
                Our Story
              </motion.p>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
                From Bean to Cup: The ERASTO COFFEE Journey
              </motion.h2>
              <motion.div variants={itemVariants}>
                <p className="text-muted-foreground mb-6">
                  Founded by Erasto Kamuli Jelemia and Ronaldo Matiku in 2025, ERASTO COFFEE COMPANY was born from a passion for Tanzania's exceptional coffee and a commitment to sustainable farming practices.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our coffee is grown on the fertile slopes of Mount Kilimanjaro and the highlands of Mbeya region, where the unique combination of altitude, soil, and climate creates beans with distinctive flavors and aromas.
                </p>
                <p className="text-muted-foreground mb-8">
                  We work directly with local farmers to ensure fair compensation and sustainable cultivation methods, preserving both the environment and the future of Tanzanian coffee.
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button asChild>
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Coffee Process */}
      <section ref={processRef} className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.p variants={itemVariants} className="text-accent font-medium mb-3">
              Our Process
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              From Harvest to Home
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
              Every step in our process is carefully managed to ensure the highest quality coffee reaches your cup.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600",
                title: "Harvesting",
                description: "Carefully hand-picked by local farmers at peak ripeness"
              },
              {
                image: "https://images.pexels.com/photos/2852050/pexels-photo-2852050.jpeg?auto=compress&cs=tinysrgb&w=600",
                title: "Processing",
                description: "Properly processed to preserve natural flavors"
              },
              {
                image: "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=600",
                title: "Roasting",
                description: "Expertly roasted to enhance unique flavor profiles"
              },
              {
                image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600",
                title: "Packaging",
                description: "Sealed to preserve freshness and shipped worldwide"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-card flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{index + 1}. {step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent font-medium mb-3">Customer Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - see what coffee lovers around the world have to say about ERASTO COFFEE.
            </p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-cover bg-fixed opacity-20 z-0" style={{ backgroundImage: "url('https://images.pexels.com/photos/2130165/pexels-photo-2130165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')" }} />
        <div className="absolute inset-0 bg-card opacity-90 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Taste of Tanzania?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of coffee lovers who start their day with the rich, aromatic flavors of ERASTO COFFEE.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/products">
                    Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}