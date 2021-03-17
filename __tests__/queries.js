const app = require("../functions/api");
const supertest = require("supertest");
// const { stopDatabase } = require("../src/database");
 
const request = supertest(app);
 
// afterAll(async () => {
//   await stopDatabase();
// });
 
// test("fetch pokemons", async (done)=> {
      

describe('describer Pokemon List', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
      });
    var isHaveProperties = function(pokemon){
        for (let i = 0; i < pokemon.length; i += 1) {
            // expect(pokemon[i]).toHaveProperty('id');
            expect(pokemon[i]).toHaveProperty('name');
        }
    }
    test("fetch List Pokemons", async (done) => {
        request
            .post("/")
            .send({
                query: "{ listpokemonQuery{ name } }",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.listpokemonQuery.length).toEqual(20);
                expect(isHaveProperties(res.body.data.listpokemonQuery));
                done();
        });
    });

});

describe('describer Single Pokemon', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
    var isValidData = function(res) {
        res.body.should.have.property("id", "name");
    };
    test("fetch Single Pokemon", async (done) => {
        request
            .post("/")
            .send({
                query: "{ pokemonQuery(id: 1){ id, name } }",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                // expect(isValidOrg);
                done();
        });
    });

});