export const ok = (msg: string) => {
    return {
        message: msg,
        status: 200,
        timestamp: Date.now()
    } 
}

export const created = (msg: string) => {
    return {
        message: msg,
        status: 201,
        timestamp: Date.now()
    } 
}

export const notFound = (msg: string) => {
    return {
        message: msg,
        status: 404,
        timestamp: Date.now()
    } 
}

export const unauthorized = (msg: string) => {
    return {
        message: msg,
        status: 401,
        timestamp: Date.now()
    } 
}

export const serverError = (msg: string) => {
    return {
        message: msg,
        status: 500,
        timestamp: Date.now()
    } 
}

export const badRequest = (msg: string) => {
    return {
        message: msg,
        status: 400,
        timestamp: Date.now()
    } 
}