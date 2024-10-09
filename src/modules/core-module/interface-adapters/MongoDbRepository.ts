import { Collection } from "mongodb";
import { IRepository } from "../application/Repository";
import { IDataParser } from "../domain/DataParser";
import { Entity } from "../domain/Entity";
import { MongoDbDriver } from "./MongoDbDriver";

export abstract class MongoDbRepository<TEntity extends Entity, TDao> implements IRepository<TEntity> {
    constructor(
        public readonly _driver: MongoDbDriver,
        public readonly _collection: Collection<TDao>,
        public readonly _dataParser: IDataParser<TEntity, TDao>,
    ) {
    }

    async create(entity: TEntity): Promise<TEntity> {
        const dao = this._dataParser.toDAO(entity);
        await this._collection.insertOne(dao as any);
        return entity;
    }

    async update(id: string, entity: TEntity): Promise<TEntity> {
        const dao = this._dataParser.toDAO(entity);
        await this._collection.updateOne({ id: id as any }, { $set: dao as TDao });
        return entity;
    }

    async delete(id: string): Promise<void> {
        await this._collection.deleteOne({ id: id as any });
    }

    async findById(id: string): Promise<TEntity | undefined> {
        const dao = await this._collection.findOne({ id: id as any });
        if (dao) {
            return this._dataParser.toEntity(dao as TDao);
        }

        return undefined
    }

    async findAll(): Promise<TEntity[]> {
        const docs = await this._collection.find({}).toArray();
        if (docs.length > 0) {
            return docs.map(doc => this._dataParser.toEntity(doc as TDao));
        }

        return []
    }
}