export interface  Node {
    id: number,
    name: string,
    options: JSON,
    description: string
}

export interface  Option {
    id: number,
    option_name: string,
    option_id: number,
    nextNode: number,
    description: string
}
