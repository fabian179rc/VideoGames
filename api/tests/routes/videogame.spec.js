/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: "Este es el mejor juego",
  platforms: ["pc"]
};
const videogameNoName = {
  name: '',
  description: "Este es el mejor juego",
  platforms: ["pc"]
};

const videogameNoPlatforms = {
  name: 'Super Mario Bros',
  description: "Este es el mejor juego",
  platforms: []
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', async () =>
     await agent.get('/videogames')
     .expect(200)
    );
  });
  describe('POST /videogames', () => {
    it('No debería permitir crear un Videogame sin name', async () =>
    await agent.post('/videogames')
    .send(videogameNoName)
    .expect(400) 
  );
    it('No debería permitir crear un Videogame sin platform', async () =>
    await agent.post('/videogames')
    .send(videogameNoPlatforms)
    .expect(400) 
  );
});
});
