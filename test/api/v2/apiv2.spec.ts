import app from '../../../minimart-server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { Response } from 'superagent';
import { request, expect } from 'chai';

describe('API - v2', () => {
  describe('1. Test if version 2 is working', () => {
    it('Should return version number', async () => {
      const res: Response = await request(app).get('/api/v2');
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.text).to.eql("Welcome to Minimart Api Version 2.0");
    });
  });
});