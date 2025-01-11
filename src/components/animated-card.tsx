import { motion } from "framer-motion";
import { Card,  CardDescription, CardHeader, CardTitle } from './ui/card';


interface AnimatedCardProps {
    title: string
    description: string
    icon: any
}

export const AnimatedCard = ({title, description, icon: Icon}:AnimatedCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="transform transition-transform">
             <Card>
                <CardHeader>
                     <CardTitle className="flex items-center space-x-2"><Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400"/> {title}</CardTitle>
                     <CardDescription>{description}</CardDescription>
                 </CardHeader>
             </Card>
        </motion.div>
    )
}