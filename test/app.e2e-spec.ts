import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "1+2-3*4/5"})
      .expect(200)
      .expect({"calculus": "1+2-3*4/5","result": "0.6"});              
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "-1.1+-2.2--3.3*-4.4/-5.5"})
      .expect(200)
      .expect({"calculus": "-1.1+-2.2--3.3*-4.4/-5.5","result": "-0.66"});              
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "1.1+2.2-3.3*4.4/5.5"})
      .expect(200)
      .expect({"calculus": "1.1+2.2-3.3*4.4/5.5","result": "0.66"});              
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "-3--3"})
      .expect(200)
      .expect({"calculus": "-3--3","result": "0"});              
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "2++2"})
      .expect(422)       
  });

  it('/calc (POST)', () => {
    return request(app.getHttpServer())
      .post('/calc', )
      .send({calculus: "sefsfsefsef"})
      .expect(422)       
  });
});
