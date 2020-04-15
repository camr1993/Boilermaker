/* global describe beforeEach it */

const { expect } = require('chai');
const { db, User } = require('../db');
const app = require('../index');
const agent = require('supertest')(app);

describe('User routes', () => {
  beforeEach(async () => {
    try {
      await db.sync({ force: true });
    } catch (error) {
      console.log('sync error');
    }
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(async () => {
      try {
        const user = await User.create({
          email: codysEmail,
        });
        return user;
      } catch (error) {
        console.log('creation error');
      }
    });

    it('GET /api/users', async () => {
      try {
        const res = await agent.get('/api/users').expect(200);

        expect(res.body).to.be.an('array');
        expect(res.body[0].email).to.be.equal(codysEmail);
      } catch (error) {
        console.log('GET route error');
      }
    });
  });
});
