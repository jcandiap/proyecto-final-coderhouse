import express from 'express';
import productRoutes from './routes/products.js';

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Server up on port ${ PORT }`));

server.on('error', error => console.log(`Error en el servidor: ${ error }`));

app.use(express.json());

app.use('/api/productos', productRoutes);