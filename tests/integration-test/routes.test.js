const server = require('../../server')
const request = require('supertest')


describe('Encoding and decoding routes', ()=>{
    // Test homepage rendering
  it('GET / should return homepage', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<!DOCTYPE html>');
  });

  
})