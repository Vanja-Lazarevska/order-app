export interface User {
    id: number,
    username: string, 
    password: string
}


export interface UserRequestBody {
    username: string, 
    password: string
}

export interface userRegister {
    name: string,
    lname: string,
    username: string,
    password: string
}