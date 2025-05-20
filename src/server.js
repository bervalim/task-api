import { randomUUID } from "node:crypto";
import http from "node:http";
import moment from "moment"
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database()

const server = http.createServer(async (req,res)=>{
   const {method, url} = req

   await json(req,res)
   
   if(method==="GET" && url ==="/tasks"){
    const tasks = database.select("tasks")
    return res.end(JSON.stringify(tasks))
   }

   if(method==="POST" && url==="/tasks"){
        
        const {title, description} = req.body

        const newTask = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at:  moment().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: null
        }

        database.insert("tasks", newTask)
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3000)