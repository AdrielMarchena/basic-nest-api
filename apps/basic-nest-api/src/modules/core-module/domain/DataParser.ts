export interface IDataParser<TEntity, TDAO> {
    toDAO(entity: TEntity): TDAO;
    toEntity(dao: TDAO): TEntity;
}
