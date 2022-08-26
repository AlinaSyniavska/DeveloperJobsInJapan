require('dotenv').config();
const {config} = require('./configs');

const express = require('express');
const {createServer} = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

const {positionRouter, applicantRouter} = require('./routes');

mongoose.connect(config.MONGO_URL);

const app = express();
const server = createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('room:join', (joinInfo) => {
        socket.join(joinInfo.roomId); // call join to subscribe the socket to a given channel (room)
        console.log(`New Applicant with email ${joinInfo.email} joined into room ${joinInfo.roomId}`);
    });

    socket.on('postNewPosition', ({position, roomId}) => {
        console.log(`New position add in room ${roomId}`);
        console.log(JSON.stringify(position, null, 2));
        // To all room members
        io.to(roomId).emit('sendEmail', {position});
    });



});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cors());

app.use('/positions', positionRouter);
app.use('/applicants', applicantRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err.message || 'Unknown Error',
        code: err.status || 400,
    });
});

server.listen(config.PORT, () => {   // app.listen
    console.log(`Started on port ${config.PORT}`);
});


