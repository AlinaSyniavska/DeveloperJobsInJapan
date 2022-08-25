require('dotenv').config();
const {config} = require('./configs');

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

const {positionRouter} = require('./routes');

mongoose.connect(config.MONGO_URL);

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {


});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.NODE_ENV !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cors());

app.use('/positions', positionRouter);


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


