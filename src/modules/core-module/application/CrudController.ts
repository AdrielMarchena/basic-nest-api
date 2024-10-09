import { Body, Delete, Get, Post, Put } from "@nestjs/common";
import { Entity } from "../domain/Entity";
import { IRepository } from "./Repository";
import { IViewDataParser } from "../domain/ViewDataParser";

export abstract class CrudController<TEntity extends Entity, TModel> {
    constructor(
        public readonly _repository: IRepository<TEntity>,
        public readonly _dataParser: IViewDataParser<TEntity, TModel>
    ) { }


    @Get()
    async get(@Body() body: any): Promise<TModel> {
        const entity = await this._repository.findById(body.id);
        if (!entity) {
            throw new Error(`Entity with id ${body.id} not found`);
        }
        return this._dataParser.toModel(entity);
    }

    @Post()
    async create(@Body() entity: TModel): Promise<TModel> {
        const possibleEntity = this._dataParser.toEntity(entity);
        const newEntity = await this._repository.create(possibleEntity);
        return this._dataParser.toModel(newEntity);
    }

    @Get("/all")
    async getAll(): Promise<TModel[]> {
        const entities = await this._repository.findAll();
        return entities.map(entity => this._dataParser.toModel(entity));
    }

    @Put()
    async update(@Body() entity: TModel): Promise<TModel> {
        const possibleEntity = this._dataParser.toEntity(entity);
        const updatedEntity = await this._repository.update(possibleEntity.id, possibleEntity);
        return this._dataParser.toModel(updatedEntity);
    }

    @Delete()
    async delete(@Body() body: any): Promise<void> {
        return await this._repository.delete(body.id);
    }
}