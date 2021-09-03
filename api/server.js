const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const server = express();

const logger = (req, res, next) => {
    const formatUrl = `${req.baseUrl}${req.url}`;
    const log = `---------------------------
    ${Date()} 
    method: ${req.method}
    URL: ${formatUrl}
    status: ${res.statusCode}
    requester IP: ${req.ip} \n************`;
    console.log(log);
    next();
};

server.use(express.json());
server.use(cors());
server.use(logger);
server.use(morgan('dev'));
//server.use('/api', actionsRouter)
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Sprint 4!',
        message2: 'TRY endpoint /api/projects',
        message3: 'TRY endpoint /api/actions'
    });
});

module.exports = server;
