import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

interface VoteButtonProps {
  onVote: (desregula: boolean) => void;
  disabled?: boolean;
}

export function VoteButton({ onVote, disabled }: VoteButtonProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="Opciones de votación">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(true)}
          disabled={disabled}
          className="flex gap-2 border-2 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
          aria-label="Votar que me desregula"
        >
          <ThumbsDown className="h-4 w-4" aria-hidden="true" />
          Me desregula
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(false)}
          disabled={disabled}
          className="flex gap-2 border-2 border-green-200 text-green-600 hover:text-green-700 hover:bg-green-50"
          aria-label="Votar que no me desregula"
        >
          <ThumbsUp className="h-4 w-4" aria-hidden="true" />
          No me desregula
        </Button>
      </motion.div>
    </div>
  );
}