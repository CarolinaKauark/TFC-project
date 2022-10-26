import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import { Response } from 'superagent';
import Team from '../database/models/team';
import { allTeams, team } from './mocks/team.mock';
import { ITeam } from '../interfaces/team.interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeams as ITeam[] | any);
    sinon
      .stub(Team, "findByPk")
      .resolves(team as ITeam | any);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('testa se o retona todos os times na rota get /teams', async () => {
    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  });

  it('testa se o retona o time correto na rota get /teams/5', async () => {
    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams/5')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(team);
  });


});