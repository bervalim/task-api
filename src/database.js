import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
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

    select(table, search){
        let data = this.#database[table] ?? []
        
        if (search) {
          data = data.filter(task => {
            return Object.entries(search).some(([key, value]) => {
                return task[key].toLowerCase().includes(value.toLowerCase())
            });
          });
        }
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

    delete(table, id){
        const index = this.#database[table].findIndex(index => index.id === id)

        if(index === -1) {
            return false;
        }
        
        this.#database[table].splice(index,1);
        this.#persist()
        return true;
    }

    one(table,id){
        const task = this.#database[table].find(task => task.id === id);
        return task;
    }

    update(table,id,data){
    
          const index = this.#database[table].findIndex((row) => row.id === id);

          if (index > -1) {
            const currentData = this.#database[table][index];
            const updateData = { ...currentData, ...data };
            this.#database[table][index] = updateData;
            this.#persist();
            return updateData
          }

          return null;
        
    }
}