import express from 'express';
import productRoutes from './routes/products.js';
import carRoutes from './routes/car.js';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Server up on port ${ PORT }`));

server.on('error', error => console.log(`Error en el servidor: ${ error }`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRoutes);
app.use('/api/carrito', carRoutes);

app.use((req, res) => {
    res.status(400).send({ error: -2, descripcion: `ruta ${ req.baseUrl }${ req.url } método ${ req.method } no implementado` });
})