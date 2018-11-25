const request = require("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";

describe("routes : static", () => {

    describe("GET /", () => {

        it("should return status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /marco", () => {
        it("should return status code and the body should contain 'polo'", (done) => {
            request.get(marco, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toBe("polo");
                done();
            });
        });
    });
});