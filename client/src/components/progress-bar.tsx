import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
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
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <Progress
          value={value}
          className="h-4 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary [&>div]:bg-[length:10px_10px] [&>div]:bg-repeat-x [&>div]:animate-gradient"
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
          aria-hidden="true"
        >
          {getEmoji(value)}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-center font-medium flex items-center justify-center gap-2"
      >
        <span className="font-bold text-primary">
          {value}% desregulación
        </span>
        <span className="sr-only">
          Nivel de desregulación: {value} por ciento
        </span>
      </motion.div>
    </div>
  );
}