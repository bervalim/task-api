import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import moment from "moment";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path:  buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: null,
      };

      database.insert("tasks", newTask);
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path:  buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
     
    },
  },
];