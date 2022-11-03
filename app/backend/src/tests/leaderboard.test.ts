import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');


import { app } from '../app';
import sequelizeModel from '../database/models'
import { Response } from 'superagent';
import { leaderboard, leaderboardAway, leaderboardHome } from './mocks/leaderboard.mocks';
import { ILeaderboard } from '../interfaces/leaderboards.interfaces';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testa a rota "/leaderboard"', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    (sequelizeModel.query as sinon.SinonStub).restore();
  });

  it('testa se ao chamar a rota get "/home" retorna os dados dos times que jogaram em casa', async () => {
    sinon
    .stub(sequelizeModel, "query")
    .resolves(leaderboardHome as ILeaderboard[] | any);

    const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardHome);
  });

  it('testa se ao chamar a rota get "/away" retorna os dados dos times que jogaram fora de casa', async () => {
    sinon
    .stub(sequelizeModel, "query")
    .resolves(leaderboardAway as ILeaderboard[] | any);

    const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardAway);
  });

  it('testa se ao chamar a rota get "/" retorna os dados de todos os times', async () => {
    sinon
    .stub(sequelizeModel, "query")
    .resolves(leaderboard as ILeaderboard[] | any);

    const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(leaderboard);
  });
  

});