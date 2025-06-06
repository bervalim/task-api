// ?name=Bernardo&page=2'
export function extractQueryParams(query){
    // query.substr(1) -> name=Bernardo
    // split -> transforma em array -> ['name=Bernardo','page=2']
    // reduce -> percorrer o array e transformar em outra coisa qualquer
    // queryParams -> Objeto que se deseja formar no final
    return query.substr(1).split('&').reduce((queryParams ,param)=> {
        // ['page',2]  e ['name','Bernardo']
        // key,value -> Desestruturação pra pegar a primeira posição do array e a sewgunda
        const [key, value] = param.split('=')
        queryParams[key] = value
        // Objeto acumulador
        return queryParams
        // queryParams: extract query param { name: 'Bernardo', page: '2' }
    },{})
}
