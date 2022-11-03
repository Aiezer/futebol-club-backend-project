import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Teams from '../database/models/entities/Teams';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

describe('Teams tests', () => {
  describe('Case a GET request is made to /teams', () => {

    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    })

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams')

      expect(response.status).to.be.equal(200);
    });

    it('should return an array with all the teams', async () => {
      const response = await chai.request(app)
        .get('/teams')

      expect(response.body).deep.equal(teams);
    });
  })

  describe('Case a GET request is made to /teams/:id', () => {

    beforeEach(() => {
      sinon.stub(Teams, 'findOne').resolves(teams[0] as Teams);
    })

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams/1')

      expect(response.status).to.be.equal(200);
    });

    it('should return an array with all the teams', async () => {
      const response = await chai.request(app)
        .get('/teams/1')

      expect(response.body).deep.equal(teams[0]);
    });
  })
})