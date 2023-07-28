import { PrismaConfig } from "src/database/prismaConfig";
import { Crud } from "src/interfaces/crud.interface";
import { HttpResponse } from "src/types/http";

export class ListService implements Crud {
    constructor(private readonly prisma: PrismaConfig) { }

    Create(data: Object): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    Read(id: string): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    Update(data: Object, id: string): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    Delete(id: string): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
}