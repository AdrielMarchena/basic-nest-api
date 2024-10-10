export interface ProfileDAO {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    birth: Date;
    describe: string;
    password: string;
}
