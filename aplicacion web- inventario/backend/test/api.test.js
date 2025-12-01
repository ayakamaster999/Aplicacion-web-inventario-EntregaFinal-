const fs = require('fs');
const os = require('os');
const path = require('path');

// Set a temp data file before requiring the app
const tmpFile = path.join(os.tmpdir(), `data-test-${Date.now()}.json`);
process.env.DATA_FILE = tmpFile;

const request = require('supertest');
const app = require('../server');

beforeAll(() => {
  // ensure file exists
  fs.writeFileSync(process.env.DATA_FILE, '[]', 'utf8');
});

afterAll(() => {
  try { fs.unlinkSync(process.env.DATA_FILE); } catch(e){}
});

describe('API funcional básica', () => {
  test('health check', async () => {
    const res = await request(app).get('/_health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ok:true});
  });

  test('GET /api/items devuelve un arreglo', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('POST /api/items crea un item y GET lo devuelve', async () => {
    const newItem = { name: 'Prueba', qty: 2, price: 9.99, desc: 'test' };
    const post = await request(app).post('/api/items').send(newItem).set('Accept','application/json');
    expect(post.statusCode).toBe(201);
    expect(post.body).toMatchObject({ name: 'Prueba', qty: 2, price: 9.99, desc: 'test' });
    expect(post.body.id).toBeDefined();

    const get = await request(app).get('/api/items');
    expect(get.statusCode).toBe(200);
    const found = get.body.find(i => i.id === post.body.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('Prueba');
  });

  test('PUT /api/items/:id actualiza un item', async () => {
    const newItem = { name: 'ParaActualizar', qty: 1 };
    const post = await request(app).post('/api/items').send(newItem).set('Accept','application/json');
    const id = post.body.id;
    const upd = await request(app).put(`/api/items/${id}`).send({ name: 'Actualizado', qty: 5 }).set('Accept','application/json');
    expect(upd.statusCode).toBe(200);
    expect(upd.body.name).toBe('Actualizado');
    expect(upd.body.qty).toBe(5);
  });

  test('DELETE /api/items/:id elimina un item', async () => {
    const newItem = { name: 'ParaBorrar', qty: 1 };
    const post = await request(app).post('/api/items').send(newItem).set('Accept','application/json');
    const id = post.body.id;
    const del = await request(app).delete(`/api/items/${id}`);
    expect([204,200]).toContain(del.statusCode);
    const get = await request(app).get('/api/items');
    const found = get.body.find(i => i.id === id);
    expect(found).toBeUndefined();
  });
});
