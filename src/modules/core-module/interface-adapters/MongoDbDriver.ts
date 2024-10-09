import { Db, MongoClient } from "mongodb";
import { DbDriver } from "../application/DbDriver";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoDbDriver implements DbDriver<Db> {
    private _client: MongoClient;
    private _driver: Db;
    constructor(
        public readonly url: string,
        public readonly dbName: string,
    ) {
    }

    public async connect(): Promise<void> {
        this._client = new MongoClient(this.url);
        await this._client.connect();
        this._driver = this._client.db(this.dbName);
    }

    public get driver(): Db {
        return this._driver;
    }
}
