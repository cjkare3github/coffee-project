"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Wilson",
    location: "New York, USA",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "The Kilimanjaro Morning Blend is the best coffee I've ever had! The fruity notes are perfectly balanced, and it makes my morning ritual something special. I've been a subscriber for over a year now.",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "As a coffee shop owner, I'm extremely particular about the beans I serve. ERASTO COFFEE's Mbeya Highland Reserve has become our signature espresso blend. Our customers can't get enough of it!",
    rating: 5
  },
  {
    id: 3,
    name: "David Chen",
    location: "Toronto, Canada",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "The Tanzanian Peaberry is unlike any coffee I've tried before. The floral notes and brightness are exceptional. The shipping was prompt, and the beans arrived fresh. Will definitely order again!",
    rating: 4
  },
  {
    id: 4,
    name: "Emma Thompson",
    location: "London, UK",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "I received the Organic Moshi Cooperative as a gift, and it's now my favorite coffee. Knowing that it supports sustainable farming makes each cup even more enjoyable. The tropical fruit notes are delightful!",
    rating: 5
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Auto-rotate the testimonials
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, autoplay]);
  
  const handlePrevious = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            className="p-6 md:p-10 bg-card rounded-lg shadow-md relative"
          >
            <div className="absolute -top-6 left-10 text-primary/20">
              <Quote size={80} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden relative">
                  <Image 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonials[currentIndex].location}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg italic relative z-10">{testimonials[currentIndex].content}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? "text-amber-400" : "text-muted stroke-muted"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => {
                setAutoplay(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden md:flex"
          onClick={handlePrevious}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:flex"
          onClick={handleNext}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;