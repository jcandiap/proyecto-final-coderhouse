import app from '../app.js';
import request from 'supertest';

describe('GET /api/carrito', () => {
    test('Obtener todos los carritos', async () => {
        const response = await request(app).get('/api/carrito/').send();
        expect(response.statusCode).toBe(200);
    });

    test('Obtener un carrito por id', async () => {
        const response = await request(app).get('/api/carrito/1').send();
        expect(response.statusCode).toBe(200);
    });

    test('Obtener un carrito por id que no existe', async () => {
        const response = await request(app).get('/api/carrito/car').send();
        expect(response.statusCode).toBe(400);
    });
});

describe('POST /api/carrito', () => {
    test('Agregar un carrito', async () => {
        const response = await request(app).post('/api/carrito/').send();
        expect(response.statusCode).toBe(200);
    });
});