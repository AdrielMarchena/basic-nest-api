import { createClient, RedisClientType } from 'redis';
import { DbDriver } from '../application/DbDriver';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisDbDriver implements DbDriver<RedisClientType> {
    private _driver: RedisClientType;
    private _isConnected: boolean = false;
    constructor() {
    }

    public async connect(): Promise<void> {
        if (this._isConnected) return;
        this._driver = createClient();
        await this._driver.connect();
        this._isConnected = true;
    }

    public get driver(): RedisClientType {
        return this._driver;
    }
}
