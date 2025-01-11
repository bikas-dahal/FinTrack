import { motion } from "framer-motion";
const testimonialsData = [
    {
        text: "FinTrack helped me understand where my money was going. I can now manage my budget more effectively.",
        author: "Ram Bahadur"
    },
    {
      text:  "Easy to use, and the reports are very insightful. I highly recommend FinTrack to everyone in Nepal.",
      author: "Sita Sharma"
    },
    {
        text: "The language support (Nepali) is a huge plus for me. Finally, a finance app I can truly understand!",
        author: "Gopal Thapa"
    }
]

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transform transition-transform hover:scale-102"
            >
            <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;