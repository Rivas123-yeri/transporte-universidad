const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.redirect('/estudiante.html');
});


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('ubicacion', (data) => {
        socket.broadcast.emit('ubicacion', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


