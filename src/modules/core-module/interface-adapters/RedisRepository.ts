import { IRepository } from "../application/Repository";
import { IDataParser } from "../domain/DataParser";
import { Entity } from "../domain/Entity";
import { RedisDbDriver } from "./RedisDbDriver";

export abstract class RedisRepository<TEntity extends Entity> implements IRepository<TEntity> {
    constructor(
        public readonly _driver: RedisDbDriver,
        public readonly _collection: string,
        public readonly _dataParser: IDataParser<TEntity, string>,
    ) { }

    async _exists(id: string): Promise<boolean> {
        const result = await this._driver.driver.exists(`${this._collection}:${id}`);
        return result.toString() === "2";
    }

    async create(entity: TEntity): Promise<TEntity> {
        const exists = await this._exists(entity.id);
        if (exists) {
            throw new Error(`Entity with id ${entity.id} already exists`);
        }

        const dao = this._dataParser.toDAO(entity);

        await this._driver.driver.set(`${this._collection}:${entity.id}`, dao);
        return entity;
    }

    async update(id: string, entity: TEntity): Promise<TEntity> {
        const exists = await this._exists(entity.id);
        if (!exists) {
            throw new Error(`Entity with id ${id} not found`);
        }

        const dao = this._dataParser.toDAO(entity);

        await this._driver.driver.set(`${this._collection}:${entity.id}`, dao);
        return entity;
    }

    async delete(id: string): Promise<void> {
        const exists = await this._exists(id);

        if (!exists) {
            throw new Error(`Entity with id ${id} not found`);
        }

        await this._driver.driver.del(`${this._collection}:${id}`);
    }

    async findById(id: string): Promise<TEntity | undefined> {
        const dao = await this._driver.driver.get(`${this._collection}:${id}`);

        if (!dao) {
            return undefined;
        }

        return this._dataParser.toEntity(dao);
    }

    async findAll(): Promise<TEntity[]> {
        const daos = await this._driver.driver.hGetAll(this._collection);

        const map = Object.entries(daos).map(([id, dao]) => ({ id, dao }));

        return map.map((dao) => this._dataParser.toEntity(JSON.stringify(dao)));
    }
}
