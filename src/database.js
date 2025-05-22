import fs from 'node:fs/promises'

console.log(import.meta.url)
const databasePath = new URL('../db.json', import.meta.url)
console.log('databasePath' ,databasePath);




export class Database {
    constructor(){
        fs.readFile(databasePath,'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(()=> {
            this.#persist()
        })
    }
    #database = {}

    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database))
    }

    select(table){
        console.log(this.#database[table])
        const data = this.#database[table] ?? []
        return data
    }


    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }
}