import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

interface VoteButtonProps {
  onVote: (desregula: boolean) => void;
  disabled?: boolean;
}

export function VoteButton({ onVote, disabled }: VoteButtonProps) {
  return (
    <div className="flex gap-2">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(true)}
          disabled={disabled}
          className="flex gap-2 text-red-600 hover:text-red-700"
        >
          <ThumbsDown className="h-4 w-4" />
          Me desregula
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(false)}
          disabled={disabled}
          className="flex gap-2 text-green-600 hover:text-green-700"
        >
          <ThumbsUp className="h-4 w-4" />
          No me desregula
        </Button>
      </motion.div>
    </div>
  );
}
