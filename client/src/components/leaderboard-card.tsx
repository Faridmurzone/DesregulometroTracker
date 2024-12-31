import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ItemStats {
  total: number;
  desregula: number;
  noDesregula: number;
  percentage: number;
}

interface LeaderboardItem {
  id: number;
  description: string;
  stats: ItemStats;
}

interface LeaderboardCardProps {
  items: LeaderboardItem[];
}

export function LeaderboardCard({ items }: LeaderboardCardProps) {
  // Sort items by percentage of "desregula" votes
  const sortedItems = [...items].sort((a, b) => b.stats.percentage - a.stats.percentage);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Top Desreguladores 🏆</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl font-bold text-primary w-8">
                #{index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium">{item.description}</p>
                <div className="text-sm text-muted-foreground">
                  {item.stats.percentage}% lo consideran desregulador
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
