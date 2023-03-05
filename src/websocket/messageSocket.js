import { Server } from 'socket.io';

export async function configureMessageSocket(server) {

    const io = new Server(server);

    io.on('connection', (socket) => {

        socket.on('newMessage', async (data) => {
            
        })
            
    });

}