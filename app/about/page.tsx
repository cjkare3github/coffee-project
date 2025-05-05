"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle, Coffee, Heart, Leaf } from 'lucide-react';
import afterImg from '../../images/after.jpg';
import desnImg from '../../images/desn.jpg';
import tinaImg from './tina.jpg';
import adinanImg from '../../images/adinan.jpg';
import simonImg from '../../images/simon.jpg';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });
  
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  const valueItems = [
    {
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: "Quality First",
      description: "We never compromise on quality. From selecting the finest beans to meticulous roasting and packaging, excellence guides every step."
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainability",
      description: "We're committed to sustainable farming practices that preserve Tanzania's environment and support farming communities."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Community Support",
      description: "Fair compensation and reinvestment in local communities are central to our business model."
    }
  ];
  
  const teamMembers = [
    {
      name: "Erasto Kamuli Jelemia",
      role: "Founder & CEO",
      image: afterImg,
      bio: "With over 5 years of experience in coffee cultivation, Erasto founded ERASTO COFFEE COMPANY to share Tanzania's exceptional coffee with the world."
    },
    {
      name: "Adinan Said Luhaga",
      role: "Co-Founder & Master Roaster",
      image: adinanImg,
      bio: "Adinan's expertise in roasting brings out the unique characteristics of each bean variety, creating our signature flavor profiles."
    },
    {
      name: "Christinah Kamuli Jelemia",
      role: "Head of Sustainability",
      image: tinaImg,
      bio: "Christinah works directly with farmers to implement sustainable practices and ensure fair compensation throughout our supply chain."
    },
    {
      name: "Simon Daudi",
      role: "Co-Founder & Master Roaster",
      image: simonImg,
      bio: "Simon's expertise in roasting brings out the unique characteristics of each bean variety, creating our signature flavor profiles."
    },
    
  
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[70vh] flex items-center"
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2159058/pexels-photo-2159058.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            backgroundPosition: "center",
            y: heroY,
            opacity: heroOpacity
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Founded on a passion for exceptional coffee and sustainable farming, ERASTO COFFEE COMPANY brings the rich flavors of Tanzania to coffee lovers worldwide.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section ref={storyRef} className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/1290696/pexels-photo-1290696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Coffee farmers in Tanzania"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white">Coffee farmers in the highlands of Mbeya region</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
                From a Dream to Reality
              </motion.h2>
              <motion.div variants={itemVariants}>
                <p className="text-muted-foreground mb-4">
                  ERASTO COFFEE COMPANY was born in 2025 when childhood friends Erasto Kamuli Jelemia and Ronaldo Matiku decided to share their country's exceptional coffee with the world. Growing up in the coffee-growing regions of Tanzania, they witnessed firsthand the dedication of local farmers and the unique qualities of Tanzanian coffee.
                </p>
                <p className="text-muted-foreground mb-4">
                  What started as a small operation with just a few partner farms has grown into a thriving company that works with hundreds of farmers across Tanzania's premier coffee regions. Throughout our growth, we've maintained our founding principles: quality, sustainability, and fair trade.
                </p>
                <p className="text-muted-foreground mb-6">
                  Today, we're proud to bring the distinctive flavors of Tanzanian coffee to customers in over 20 countries, while supporting the communities where our coffee is grown.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To deliver exceptional Tanzanian coffee while supporting sustainable farming practices and improving the lives of coffee-growing communities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section ref={valuesRef} className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Our Values
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at ERASTO COFFEE COMPANY.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueItems.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={valuesInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-8 shadow-sm"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sustainable Practices */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">Sustainable Practices</h2>
              <p className="text-muted-foreground mb-6">
                Sustainability isn't just a buzzword for us—it's a commitment that permeates every aspect of our business. We believe that the best coffee comes from healthy ecosystems and thriving communities.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Direct trade partnerships with over 500 small-scale farmers",
                  "Organic farming practices that preserve soil health",
                  "Water conservation initiatives and processing improvements",
                  "Biodiversity protection in coffee-growing regions",
                  "Fair compensation that exceeds industry standards"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <Image
                src="https://images.pexels.com/photos/4221096/pexels-photo-4221096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Coffee farmers"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
              <Image
                src="https://images.pexels.com/photos/5946646/pexels-photo-5946646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Coffee processing"
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-auto mt-8"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
              Meet Our Team
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind ERASTO COFFEE COMPANY who work tirelessly to bring you the finest Tanzanian coffee.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-sm"
              >
                <div className="h-72 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Us on Our Journey
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience the exceptional taste of Tanzanian coffee while supporting sustainable farming and fair trade practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link href="/products">
                  Shop Our Coffee
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
