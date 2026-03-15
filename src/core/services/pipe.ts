export interface Pipe {
    handle(payload: object, next: (payload: object) => object): object
}
