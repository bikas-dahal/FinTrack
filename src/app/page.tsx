"use client"

import Features from '@/components/landing/features';
import Footer from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import Testimonials from '@/components/landing/testimonials';
import { motion } from 'framer-motion';


export default function Home() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
     className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </motion.div>
  );
}