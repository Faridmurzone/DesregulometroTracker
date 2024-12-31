import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  // Get emoji based on percentage
  const getEmoji = (percentage: number) => {
    if (percentage >= 80) return "🤯";
    if (percentage >= 60) return "😤";
    if (percentage >= 40) return "😕";
    if (percentage >= 20) return "😌";
    return "😊";
  };

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Progress
          value={value}
          className="h-4 bg-purple-100"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
          className="absolute -right-2 -top-1 text-xl"
        >
          {getEmoji(value)}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-center font-medium"
        style={{
          background: `linear-gradient(90deg, 
            var(--primary) ${value}%, 
            transparent ${value}%
          )`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}% desregulación
      </motion.div>
    </div>
  );
}