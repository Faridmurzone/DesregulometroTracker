import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { items, votes } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all items with vote counts
  app.get("/api/items", async (_req, res) => {
    const result = await db.query.items.findMany();
    const itemsWithStats = await Promise.all(
      result.map(async (item) => {
        const allVotes = await db.query.votes.findMany({
          where: eq(votes.itemId, item.id),
        });
        const total = allVotes.length;
        const desregula = allVotes.filter(v => v.desregula).length;

        return {
          ...item,
          stats: {
            total,
            desregula,
            noDesregula: total - desregula,
            percentage: total ? Math.round((desregula / total) * 100) : 0
          }
        };
      })
    );
    res.json(itemsWithStats);
  });

  // Add new item
  app.post("/api/items", async (req, res) => {
    const { description } = req.body;
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return res.status(400).json({ message: "Description is required" });
    }

    const newItem = await db.insert(items)
      .values({ description: description.trim() })
      .returning();

    res.json({ ...newItem[0], stats: { total: 0, desregula: 0, noDesregula: 0, percentage: 0 } });
  });

  // Add vote
  app.post("/api/votes", async (req, res) => {
    const { itemId, desregula } = req.body;
    const vote = await db.insert(votes).values({
      itemId,
      desregula
    }).returning();
    res.json(vote[0]);
  });

  // Initialize default items if none exist
  app.post("/api/init", async (_req, res) => {
    const existingItems = await db.query.items.findMany();
    if (existingItems.length === 0) {
      const defaultItems = [
        "El cuchillo adentro del dulce de leche",
        "El papel higienico mal colocado", 
        "Las laptops abiertas sin desbloquear",
        "Un ringtone de un teléfono"
      ];

      await db.insert(items).values(
        defaultItems.map(description => ({ description }))
      );
    }
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}