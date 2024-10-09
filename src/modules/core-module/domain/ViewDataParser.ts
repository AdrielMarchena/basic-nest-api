export interface IViewDataParser<TEntity, TModel> {
    toModel(entity: TEntity): TModel;
    toEntity(model: TModel): TEntity;
}
