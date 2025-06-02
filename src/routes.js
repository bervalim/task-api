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
      const { id } = req.params
      const isDeleted =  database.delete("tasks",id)

      if(!isDeleted){
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: "GET",
    path:  buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.one("tasks",id)

      if(!task){
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }
      return res.writeHead(200).end(JSON.stringify(task));
    },
  },
  {
    method: "PUT",
    path:  buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      const { title, description } = req.body;

      const updatedTask = {
        title,
        description,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
      };

      const task = database.update("tasks", id, updatedTask)

      if(!task){
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      return res.writeHead(200).end(JSON.stringify(task));
    },
  },
];