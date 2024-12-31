import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteButton } from "./vote-button";
import { ProgressBar } from "./progress-bar";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ItemStats {
  total: number;
  desregula: number;
  noDesregula: number;
  percentage: number;
}

interface ItemCardProps {
  id: number;
  description: string;
  stats: ItemStats;
}

export function ItemCard({ id, description, stats }: ItemCardProps) {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async (desregula: boolean) => {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, desregula }),
      });
      if (!res.ok) throw new Error("Failed to vote");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{description}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <VoteButton
            onVote={(desregula) => voteMutation.mutate(desregula)}
            disabled={voteMutation.isPending}
          />
          
          <div className="space-y-2">
            <ProgressBar value={stats.percentage} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{stats.desregula} desregula</span>
              <span>{stats.noDesregula} no desregula</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
