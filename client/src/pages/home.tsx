import { useQuery } from "@tanstack/react-query";
import { ItemCard } from "@/components/item-card";
import { LeaderboardCard } from "@/components/leaderboard-card";
import { AddItemForm } from "@/components/add-item-form";

export function Home() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["/api/items"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Desregulómetro</h1>
          <p className="text-muted-foreground">
            ¿Qué cosas te desregulan en el trabajo? ¡Vota y descubre qué piensan tus compañeros!
          </p>
        </header>

        <AddItemForm />

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            {items?.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                description={item.description}
                stats={item.stats}
              />
            ))}
          </div>

          <div className="md:sticky md:top-8 h-fit">
            <LeaderboardCard items={items || []} />
          </div>
        </div>
      </div>
    </div>
  );
}