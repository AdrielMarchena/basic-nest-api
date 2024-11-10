import { Body, Delete, Get, Param, Post, Put, Type } from "@nestjs/common";
import { IRepository } from "./Repository";
import { IViewDataParser } from "../domain/ViewDataParser";
import { ApiBody } from "@nestjs/swagger";
import { Entity } from "@repo/core";

export abstract class CrudController<TEntity extends Entity, TModel> {
    constructor(
        public readonly _repository: IRepository<TEntity>,
        public readonly _dataParser: IViewDataParser<TEntity, TModel>,
    ) {
    }

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

    @Get()
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

    private static addMethodDecorator(target: any, methodName: string, decorator: MethodDecorator) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
        if (descriptor) {
            decorator(target.prototype, methodName, descriptor);
            Object.defineProperty(target.prototype, methodName, descriptor);
        }
    }

    private static addParameterDecorator(target: any, methodName: string, parameterIndex: number, decorator: ParameterDecorator) {
        decorator(target.prototype, methodName, parameterIndex);
    }

    public static applyDecorators(target: Type, apiBody: Type, endpoints: string[] = ["get", "create", "getAll", "update", "delete"],) {
        if (endpoints.includes('get')) {
            CrudController.addMethodDecorator(target, 'get', Get(':id'));
            CrudController.addParameterDecorator(target, 'get', 0, Param('id'));
        }

        if (endpoints.includes('create')) {
            CrudController.addMethodDecorator(target, 'create', Post());
            CrudController.addMethodDecorator(target, 'create', ApiBody({ type: apiBody }));
            CrudController.addParameterDecorator(target, 'create', 0, Body());
        }

        if (endpoints.includes('getAll')) {
            CrudController.addMethodDecorator(target, 'getAll', Get());
        }

        if (endpoints.includes('update')) {
            CrudController.addMethodDecorator(target, 'update', Put(':id'));
            CrudController.addMethodDecorator(target, 'update', ApiBody({ type: apiBody }));
            CrudController.addParameterDecorator(target, 'update', 0, Param('id'));
            CrudController.addParameterDecorator(target, 'update', 1, Body());
        }

        if (endpoints.includes('delete')) {
            CrudController.addMethodDecorator(target, 'delete', Delete(':id'));
            CrudController.addParameterDecorator(target, 'delete', 0, Param('id'));
        }
    }
}