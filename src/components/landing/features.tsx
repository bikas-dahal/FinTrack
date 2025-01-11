import { Banknote, BookOpenCheckIcon, ChartBarIcon, LanguagesIcon } from 'lucide-react';
import { AnimatedCard } from '../animated-card';

const featuresData = [
  {
    title: 'Account Management',
    description: 'Easily add and manage your Income, expenses with categories for tracking.',
    icon: BookOpenCheckIcon,
  },
  {
    title: 'Budgeting Tools',
    description: 'Set budgets, track your expenses and monitor financial goals.',
    icon: Banknote,
  },
  {
    title: 'Insightful Reports',
    description: 'Visualize spending patterns with interactive charts (daily, weekly, monthly).',
    icon: ChartBarIcon,
  },
    {
    title: 'Multilingual Support',
        description: 'FinTrack available in Nepali and other languages.',
    icon: LanguagesIcon,
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
              <AnimatedCard key={index} title={feature.title} description={feature.description} icon={feature.icon}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;