import express from 'express';
import productRoutes from './routes/products.js';
import carRoutes from './routes/car.js';
import userRouters from './routes/user.js';
import dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import cluster from 'cluster';

dotenv.config();

const argv = yargs(process.argv.slice(1))
    .default('modo', 'FORK')
    .alias('m', 'modo')
    .alias('c', 'cluster')
    .argv;

const SERVER_TYPE = argv.modo || 'FORK';

const app = express();

const PORT = process.env.PORT || 8080;

let server = null;

if( SERVER_TYPE !== 'FORK' ) {
    if( cluster.isPrimary ) {
        for (let i = 0; i < os.cpus().length; i++) cluster.fork();
    } else {
        server = app.listen(PORT, () => console.log(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
    }
} else {
    server = app.listen(PORT, () => console.log(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
}

server.on('error', error => console.log(`Error en el servidor: ${ error }`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRoutes);
app.use('/api/carrito', carRoutes);
app.use('/api/usuario', userRouters);

app.use((req, res) => {
    res.status(400).send({ error: -2, descripcion: `ruta ${ req.baseUrl }${ req.url } método ${ req.method } no implementado` });
})

export default app;