export class Database {
    #database = {}

    select(table){
        const data = this.#database[table] ?? null
        return data
    }

    // Se não existir array ainda cria
    // Se j
    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        return data
    }
}