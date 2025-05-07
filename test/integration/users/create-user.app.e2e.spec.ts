import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../../src/app.module";
import * as request from 'supertest';
import {Role} from "../../../src/users/entity/role.enum";
import {User} from "../../../src/users/entity/user.entity";
import {UserRepositoryORM} from "../../../src/users/repository/user.repository.orm";
import {response} from "express";
import {isEmpty} from "rxjs";

describe('UserController (e2e) [POST] /user', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({
            transform: true,
            whitelist: true,
            validateCustomDecorators: true,
        }));

        await app.init();
    });

    it('Should fail - no authentication', async function () {
        await request(app.getHttpServer())
            .post('/user')
            .expect(401)
    });

    it('Should fail - no authorization ', async function () {
        const user = new User(
            'foo',[Role.Technician],'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        await request(app.getHttpServer())
            .post('/user')
        .set({Authorization: 'apiKey'})
        .expect(403)

    });

    it('Should fail - empty fields', async function () {
        const user = new User(
            'foo',[Role.Manager],'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);


        await request(app.getHttpServer())
            .post('/user')
            .send({
                username: '',
                roles: [],
                password: '',
                apiKey: '',
                tasks: [],
            })
            .set({Authorization: 'apiKey'})
        .expect(400)
            .then(result => {
                expect(result.body.message).toStrictEqual(
                    [
                        "userName should not be empty",
                        "userPassword should not be empty",
                        "roles should not be empty",
                        "apiKey should not be empty",

                    ]
                )
            });
    });

    it('Should fail - fields must be a string', async function () {
        const user = new User(
            'foo',[Role.Manager],'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);


        await request(app.getHttpServer())
            .post('/user')
            .send({
                username: 123,
                roles: [Role.Technician],
                password: 123,
                apiKey: 123,
                tasks: [],
            })
            .set({Authorization: 'apiKey'})
            .expect(400)
            .then(result => {
                expect(result.body.message).toStrictEqual(
                    [
                        "userName must be a string",
                        "userPassword must be a string",
                        "apiKey must be a string",
                    ]
                )
            });
    });

    it('Success - create a new user', async function () {
        const user = new User(
            'foo',[Role.Manager],'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        await request(app.getHttpServer())
            .post('/user')
            .send({
                username: 'tech4',
                roles: [Role.Technician],
                password: '12345',
                apiKey: 'apikey_tech',
                tasks: [],
            })
            .set({Authorization: 'apiKey'})
            .then((response ) => {
                console.log(response.body.tasks);
                expect(response.body.userName).toBe('tech4');
                expect(response.body.tasks).toEqual({});
                expect(response.body.createdAt).toBeDefined();
                expect(response.body.updatedAt).toBeDefined();
            });


    });
});