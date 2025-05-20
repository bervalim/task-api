import { randomUUID } from "node:crypto";
import http from "node:http";
import moment from "moment"


const tasks = []

const server = http.createServer(async (req,res)=>{
   const {method, url} = req

   const buffers = []

   for await (const chunk of req){
        buffers.push(chunk)
   }
   const body = JSON.parse(Buffer.concat(buffers).toString())

   try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
   } catch (error) {
    req.body = null
   }
   


   if(method==="GET" && url ==="/tasks"){
    return res.setHeader('Content-type','application/json').end(JSON.stringify(tasks))
   }

   if(method==="POST" && url==="/tasks"){
        
        tasks.push({
            id: randomUUID(),
            title: 'task 1',
            description: 'descrição da task',
            completed_at: null,
            created_at:  moment().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: null
        })
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3000)