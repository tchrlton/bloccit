const request = require("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/";

describe("routes : static", () => {

    describe("GET /", () => {

        it("should return status code 200 and have 'Welcome to Blocit' in the body of the response", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain("Welcome to Bloccit");
                done();
            });
        });
    });
});