import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Entity } from "../domain/Entity";
import { IRepository } from "./Repository";
import { IViewDataParser } from "../domain/ViewDataParser";
import { ApiBody } from "@nestjs/swagger";

function addMethodDecorator(target: any, methodName: string, decorator: MethodDecorator) {
    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
    if (descriptor) {
        decorator(target.prototype, methodName, descriptor);
        Object.defineProperty(target.prototype, methodName, descriptor);
    }
}

function addParameterDecorator(target: any, methodName: string, parameterIndex: number, decorator: ParameterDecorator) {
    decorator(target.prototype, methodName, parameterIndex);
}

export function applyDecorators(target: any, t: any) {
    addMethodDecorator(target, 'get', Get(':id'));

    addMethodDecorator(target, 'create', Post());
    addMethodDecorator(target, 'create', ApiBody({ type: t }));

    addMethodDecorator(target, 'getAll', Get('/all'));

    addMethodDecorator(target, 'update', Put(':id'));
    addMethodDecorator(target, 'update', ApiBody({ type: t }));

    addMethodDecorator(target, 'delete', Delete(':id'));

    addParameterDecorator(target, 'get', 0, Param('id'));
    addParameterDecorator(target, 'create', 0, Body());
    addParameterDecorator(target, 'update', 0, Param('id'));
    addParameterDecorator(target, 'update', 1, Body());
    addParameterDecorator(target, 'delete', 0, Param('id'));
}

export abstract class CrudController<TEntity extends Entity, TModel> {
    constructor(
        public readonly _repository: IRepository<TEntity>,
        public readonly _dataParser: IViewDataParser<TEntity, TModel>
    ) { }


    @Get(':id')
    async get(@Param('id') id: string): Promise<TModel> {
        const entity = await this._repository.findById(id);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found`);
        }
        return this._dataParser.toModel(entity);
    }

    @Post()
    async create(@Body() entity: TModel): Promise<TModel> {
        const possibleEntity = this._dataParser.toNewEntity(entity);
        const newEntity = await this._repository.create(possibleEntity);
        return this._dataParser.toModel(newEntity);
    }

    @Get("/all")
    async getAll(): Promise<TModel[]> {
        const entities = await this._repository.findAll();
        return entities.map(entity => this._dataParser.toModel(entity));
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() entity: TModel): Promise<TModel> {
        const possibleEntity = this._dataParser.toEntity(entity);
        const updatedEntity = await this._repository.update(id, possibleEntity);
        return this._dataParser.toModel(updatedEntity);
    }

    @Delete()
    async delete(@Param('id') id: string): Promise<void> {
        return await this._repository.delete(id);
    }
}