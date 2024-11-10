import { Entity } from "@repo/core";

export interface IRepository<TEntity extends Entity> {
    create(entity: TEntity): Promise<TEntity>;
    update(id: string, entity: TEntity): Promise<TEntity>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<TEntity | undefined>;
    findAll(): Promise<TEntity[]>;
}
