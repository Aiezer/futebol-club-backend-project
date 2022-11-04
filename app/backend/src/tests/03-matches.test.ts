// @ts-ignore
import http = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/entities/Matches';

chai.use(http);

const { expect } = chai;

describe('coverage test for matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should returns a list of matches', async () => {
    let httpRes: Response;

    httpRes = await chai.request(app).get('/matches');
    sinon.stub(Matches, 'findAll').resolves([
      {
        id: 1,
        homeTeam: 'Avaí/Kindermann',
        homeTeamGoals: 1,
        awayTeam: 'Santos',
        awayTeamGoals: 0,
        inProgress: true,
      } as any,
    ]);

    expect(httpRes.body).to.be.an('array');
    expect(httpRes.status).to.equal(200);
    expect(httpRes.body[0]).to.have.property('id');
  });
});