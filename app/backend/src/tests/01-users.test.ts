import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Users from "../database/models/entities/Users";


chai.use(chaiHttp);

const { expect } = chai;

const validLogin = {
  email: "admin@admin.com",
  password: "secret_admin",
};

const invalidLogin = {
  email: "",
  password: "",
};

const unauthorizedUser = {
  email: "myemail@email.com",
  password: "mypassword",
};

const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

const data = { id: 1 };

describe("Login tests", () => {
  describe("It is possible to login successfully", () => {
    it("Allows login with valid data", async () => {
      const response = await chai
          .request(app)
          .post("/login")
          .send(validLogin);

        expect(response.status).to.be.equal(200)
    })
  })
  describe("Case the user inputs invalid data", () => {
    describe("if an email is not provided", () => {
      it("should return a bad request status", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidLogin);

        expect(response.status).to.be.equal(400);
      });
      it("should return an object with a message", async () => {
        const message = "All fields must be filled";
        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidLogin);

        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(message);
      });
    });

    describe("if a password is not provided", () => {
      it("should return a bad request status", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidLogin);

        expect(response.status).to.be.equal(400);
      });

      it("should return an object with a message", async () => {
        const message = "All fields must be filled";
        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidLogin);

        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(message);
      });
    });

    describe("if an invalid email is provided", () => {
      beforeEach(() => {
        sinon.stub(Users, "findOne").resolves(user as Users);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should return an unauthorized status", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(unauthorizedUser);

        expect(response.status).to.be.equal(401);
      });

      it("should return an object with a message", async () => {
        const message = "Incorrect email or password";
        const response = await chai
          .request(app)
          .post("/login")
          .send(unauthorizedUser);

        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(message);
      });
    });

    describe("if an invalid password is provided", () => {
      beforeEach(() => {
        sinon.stub(Users, "findOne").resolves(user as Users);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should return an unauthorized status", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(unauthorizedUser);

        expect(response.status).to.be.equal(401);
      });

      it("should return an object with a message", async () => {
        const message = "Incorrect email or password";
        const response = await chai
          .request(app)
          .post("/login")
          .send(unauthorizedUser);

        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(message);
      });
    });
  });
})