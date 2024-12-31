import { useQuery } from "@tanstack/react-query";
import { ItemCard } from "@/components/item-card";

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
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Desregulómetro</h1>
          <p className="text-muted-foreground">
            ¿Qué cosas te desregulan en el trabajo? ¡Vota y descubre qué piensan tus compañeros!
          </p>
        </header>

        <div className="grid gap-6">
          {items?.map((item: any) => (
            <ItemCard
              key={item.id}
              id={item.id}
              description={item.description}
              stats={item.stats}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
