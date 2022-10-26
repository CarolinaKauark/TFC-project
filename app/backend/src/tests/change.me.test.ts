import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import { tokenMock } from './mocks/token.mock';
import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(User, "findOne")
  //     .resolves(tokenMock);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('testa se o login é feito com sucesso', async () => {
    const chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: "teste@teste.com",
        password: "1234567"
      })

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
    });
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});