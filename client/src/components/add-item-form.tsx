import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export function AddItemForm() {
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setDescription("");
      toast({
        title: "¡Listo!",
        description: "Se agregó el nuevo desregulador.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo agregar el desregulador.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      addItemMutation.mutate();
    }
  };

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex gap-2"
      >
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="¿Qué más te desregula?"
          className="flex-1"
          disabled={addItemMutation.isPending}
        />
        <Button 
          type="submit" 
          disabled={!description.trim() || addItemMutation.isPending}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </Button>
      </motion.form>
    </AnimatePresence>
  );
}