import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../../src/app.module";
import * as request from 'supertest';
import {User} from "../../../src/users/entity/user.entity";
import {Role} from "../../../src/users/entity/role.enum";
import {UserRepositoryORM} from "../../../src/users/repository/user.repository.orm";
import {Task} from "../../../src/tasks/entity/task.entity";
import {TaskRepositoryORM} from "../../../src/tasks/repository/task.repository.orm";
import {response} from "express";


describe('TaskController (e2e) [PATCH] /task/:id', () => {
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
            .patch('/task/:id')
            .expect(401)
    });

    it('Should fail - no authorization', async function () {
        const user = new User(
            'foo', [], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        const task = new Task(
            'demo summary', user
        );
        await moduleRef.get<TaskRepositoryORM>(TaskRepositoryORM).persist(task);

        await request(app.getHttpServer())
            .patch(`/task/${task.getIdentifier()}`)
            .set({Authorization: 'apiKey'})
            .expect(403);
    })

    it('Should fail- missing field {summary}', async function () {
        const user = new User(
            'foo', [Role.Manager], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        const task = new Task(
            'demo summary', user
        );
        await moduleRef.get<TaskRepositoryORM>(TaskRepositoryORM).persist(task);

        await request(app.getHttpServer())
            .patch(`/task/${task.getIdentifier()}`)
            .send({summary: 123})
            .set({Authorization: 'apiKey'})
            .expect(400)

    })

    it('Should fail - empty field {summary}', async function () {
        const user = new User(
            'foo', [Role.Manager], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        const task = new Task(
            'demo summary', user
        );
        await moduleRef.get<TaskRepositoryORM>(TaskRepositoryORM).persist(task);

        await request(app.getHttpServer())
            .patch(`/task/${task.getIdentifier()}`)
            .send({summary: ''})
            .set({Authorization: 'apiKey'})
            .expect(400)
    })

    it('Should fail - task not found', async function () {
        const user = new User(
            'foo', [Role.Manager], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        await request(app.getHttpServer())
            .patch(`/task/1`)
            .send({
                summary: 'this is a demo task',
                id: '1'
            })
            .set({Authorization: 'apiKey'})
            .expect(404)

    })

    it('Should fail - invalid id', async function () {
        const user = new User(
            'foo', [Role.Manager], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        await request(app.getHttpServer())
            .patch(`/task/xpto`)
            .send({
                summary: 'this is a demo task',
                id: 'xpto'
            })
            .set({Authorization: 'apiKey'})
            .expect(400)
            .then((response) => {
                expect(response.body.message).toStrictEqual(
                    [
                        'id must be a number string'
                    ]
                )
            });

    })

    it('Should fail - not a manager', async function () {
        const user = new User(
            'foo', [Role.Technician], 'bar', 'apiKey', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

        const user1 = new User(
            'foo1', [Role.Technician], 'bar', 'apiKey1', Promise.resolve([])
        );
        await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user1);

        const task = new Task(
            'demo summary', user
        );
        await moduleRef.get<TaskRepositoryORM>(TaskRepositoryORM).persist(task);

        await request(app.getHttpServer())
            .patch(`/task/${task.getIdentifier()}`)
            .send({
                summary: 'this is a demo task',
                id: task.getIdentifier()
            })
            .set({Authorization: 'apiKey1'})
            .expect(401)

    })

    it('Success - update a new task',
        async function () {
            const user = new User(
                'foo', [Role.Manager], 'bar', 'apiKey', Promise.resolve([])
            );
            await moduleRef.get<UserRepositoryORM>(UserRepositoryORM).persist(user);

            const task = new Task(
                'demo summary', user
            );
            await moduleRef.get<TaskRepositoryORM>(TaskRepositoryORM).persist(task);

            await request(app.getHttpServer())
                .patch(`/task/${task.getIdentifier()}`)
                .send({
                    summary: 'this is a demo task',
                    id: task.getIdentifier()
                })
                .set({Authorization: 'apiKey'})
                .expect(200)

        })


});