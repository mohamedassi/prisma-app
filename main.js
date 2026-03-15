import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();
app.use(express.json());


app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      age
    }
  });

  res.json(user);
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});