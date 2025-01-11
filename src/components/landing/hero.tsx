import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import Image from 'next/image'
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
        {/* Background Image with Layered Parallax Effect */}
       <div className="absolute inset-0 overflow-hidden">
           <Image
               src="/assets/bgg.webp" // Replace with your image path
               alt="Finance background"
               layout="fill"
               objectFit="cover"
               objectPosition="center"
               className="opacity-50 dark:opacity-30 z-0 scale-110 transform transition-transform duration-500"
               style={{
                    filter: 'blur(2px)'
                }}
           />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent dark:from-emerald-900 dark:via-emerald-800 z-10 opacity-50"></div>
           <div
               className="absolute inset-0 bg-emerald-200 dark:bg-emerald-700 z-5 opacity-10 pointer-events-none"
           ></div>
       </div>
      {/* Content Wrapper */}
      <div className="container mx-auto px-4 relative z-20 flex items-center justify-center h-full">
        <div className="text-center">
           <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
            >
              <span className="text-emerald-600 dark:text-emerald-400">FinTrack</span> - Your Financial <br/>
               <span className="block mt-2">Partner in Nepal</span>
            </motion.h1>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-10 leading-relaxed text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
            Take control of your finances with ease. Track income, expenses, and manage budgets effectively.
            <br />
            Start your journey towards financial freedom today.
          </motion.p>
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center gap-4">
                <Button size="lg" className="w-48 bg-gradient-to-r from-emerald-500 to-pink-500 text-xl hover:from-emerald-600 hover:to-pink-600 transition-all dura-1000">
                    <Link href={'/register'}>Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Learn More</Button>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;