
export interface DbDriver<TDriver> {
    driver: TDriver
    connect(): Promise<void>
}