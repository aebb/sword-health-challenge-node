import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../../src/app.module";
import * as request from 'supertest';


describe('TaskController (e2e) [PATCH] /task/:taskId', () => {
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
            .patch('/task/:taskId')
            .expect(401)
    });


});