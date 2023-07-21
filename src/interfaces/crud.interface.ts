export interface crud {
    Create(data: Object): Object
    Read(id: string): Object
    Update(data: Object, id: string): Object
    Delete(id: string): any
}