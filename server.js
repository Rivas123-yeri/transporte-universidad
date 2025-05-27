const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('ubicacion', (data) => {
        socket.broadcast.emit('ubicacion', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

http.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
