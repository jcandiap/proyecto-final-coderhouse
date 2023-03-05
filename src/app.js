import express from 'express';
import productRoutes from './routes/products.js';
import userRouters from './routes/user.js';
import dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import cluster from 'cluster';
import { configureLogger, logger, warnLogger } from './config/logger.js';
import os from 'os';
import { configureMessageSocket } from './websocket/messageSocket.js';

dotenv.config();
configureLogger();

const argv = yargs(process.argv.slice(1))
    .default('modo', 'FORK')
    .alias('m', 'modo')
    .alias('c', 'cluster')
    .argv;


const SERVER_TYPE = argv.modo || 'FORK';

const app = express();
let server = null;

const PORT = process.env.PORT || 8080;

if( SERVER_TYPE !== 'FORK' ) {
    if( cluster.isPrimary ) {
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork()
        };
    } else {
        server = app.listen(PORT, () => logger.info(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
    }
} else {
    server = app.listen(PORT, () => logger.info(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
}

configureMessageSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRoutes);
app.use('/api/user', userRouters);

app.use((req, res) => {
    warnLogger.warn(`Intentando ingresar una runa no implementada ${ req.baseUrl }${ req.url } método ${ req.method }`);
    res.status(400).send({ error: -2, descripcion: `ruta ${ req.baseUrl }${ req.url } método ${ req.method } no implementado` });
})

export default app;