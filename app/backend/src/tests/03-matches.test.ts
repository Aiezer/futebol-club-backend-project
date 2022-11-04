// @ts-ignore
import http = require("chai-http");
import * as sinon from "sinon";
import * as chai from "chai";

import { app } from "../app";

import { Response } from "superagent";
import Matches from "../database/models/entities/Matches";
import Users from "../database/models/entities/Users";
import Jwt from "../utils/Jwt";

chai.use(http);

const { expect } = chai;

const invalidMatch = {
  homeTeam: 16,
  awayTeam: 25,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const validMatch = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 2,
};

const data = { id: 1 };

describe("coverage test for matches", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should returns a list of matches", async () => {
    let response: Response;

    response = await chai.request(app).get("/matches");
    sinon.stub(Matches, "findAll").resolves([
      {
        id: 1,
        homeTeam: "Avaí/Kindermann",
        homeTeamGoals: 1,
        awayTeam: "Santos",
        awayTeamGoals: 0,
        inProgress: true,
      } as any,
    ]);

    expect(response.body).to.be.an("array");
    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property("id");
  });

  it("Return a status.code 200 - OK for the endpoint /matches/:query?=true", async () => {
    const OK_REQUEST = 200;
    const response = await chai.request(app).get("/matches?inProgress=true");

    expect(response.status).to.equal(OK_REQUEST);
  });

  it("Return a status.code 200 - OK for the endpoint /matches/:query?=false", async () => {
    const OK_REQUEST = 200;
    const response = await chai.request(app).get("/matches?inProgress=false");

    expect(response.status).to.equal(OK_REQUEST);
  });

  it("Return a status.code 200 and a message for the endpoint /matches/:id/finish", async () => {
    const OK_REQUEST = 200;
    const message = "Finished";
    const response = await chai.request(app).patch("/matches/16/finish");

    expect(response.status).to.equal(OK_REQUEST);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal(message);
  });

  describe("Case a token validation is needed", () => {
    describe("if a valid token is provided", () => {
      beforeEach(() => {
        sinon.stub(Jwt, "checkToken").resolves();
        sinon.stub(Jwt, "getTokenData").resolves(data);
      });

      afterEach(() => {
        sinon.restore();
      });

      // it("should return status 404 when a invalid id is provided", async () => {
      //   const message = "There is no team with such id!";
      //   const response = await chai
      //     .request(app)
      //     .post("/matches")
      //     .send(invalidMatch)
      //     .set("authorization", "validToken");

      //   expect(response.body).to.have.property("message");
      //   expect(response.body.message).to.equal(message);
      // });

      it("should return status 404 when a invalid id is provided", async () => {
        const message = "There is no team with such id!";
        const response = await chai
          .request(app)
          .post("/matches")
          .send(invalidMatch)
          .set("authorization", "validToken");

        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(message);
      });

      it("should return status 201", async () => {
        const response = await chai
          .request(app)
          .post("/matches")
          .send(validMatch)
          .set("authorization", "validToken");

        expect(response.status).to.equal(201);
      });

    //   it("should return an object with a message", async () => {
    //     const message = "There is no team with such id!";
    //     const response = await chai
    //       .request(app)
    //       .post("/matches")
    //       .send(invalidMatch);
    //       .set("authorization", "validToken");

    //     expect(response.body).to.have.property("message");
    //     expect(response.body.message).to.equal(message);
    //   });

    //   it("should return a status code 200", async () => {
    //     const OK_REQUEST = 201;
    //     const response = await chai
    //       .request(app)
    //       .post("/matches")
    //       .send(validMatch);

    //     expect(response.status).to.equal(OK_REQUEST);
    //   });
    });
  });
});
