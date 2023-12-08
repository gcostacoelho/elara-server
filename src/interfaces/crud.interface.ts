import { HttpResponse } from "src/types/http"

export interface Crud {
    Create(data: Object): Promise<HttpResponse>
    Read(id: string): Promise<HttpResponse>
    Update(data: Object, id: string): Promise<HttpResponse>
    Delete(id: string): Promise<HttpResponse>
}