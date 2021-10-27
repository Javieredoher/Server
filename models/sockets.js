const { checkJWT } = require('../helpers/jwt');
const { userConnected, 
        userDisconnected, 
        getUsers, 
        recordMessage} = require('../controllers/sockets');


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid] = checkJWT( socket.handshake.query['x-token']  );         
            

            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnected( uid );

            //Join user to a chat
            socket.join(uid);
            
            //TODO: Validate JWT
            //SI EL TOKEN NO ES VALIDO, DESCONECTAR

            //TODO: Saber que usuario esta activo con el UID

            //Connected user
            this.io.emit( 'users-list', await getUsers())

            //TODO: Usuarios conectados para

            //TODO: Unirme a un chat grupal  Socket join

            //TODO: Escuchar cuando se envia mensajes para
            socket.on('personal-message', async(payload) => {
                const message = await recordMessage (payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });
            //TODO: DB que el usuario se desconector

            //TODO: emitir usuario conectados

            socket.on('disconnect', async() => {
                await userDisconnected( uid );
                this.io.emit( 'users-list', await getUsers())
            })
            
        });
    }


}


module.exports = Sockets;