// path -> task/1

export const buildRoutePath = (path) => {
    const routeParamsRegex = /:([a-zA-Z]+)/g;

    console.log(path.matchAll(routeParamsRegex))
    const pathWithParams = path.replaceAll(routeParamsRegex,'([a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex;
}