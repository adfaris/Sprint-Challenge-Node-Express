const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const projectRouter = require('./projectRouter/projectRouter.js');
const actionRouter = require('./actionRouter/actionRouter.js');

const server = express();

function actionUppercase (req, res, next){
    if (req.body.action=== true){
        req.body.action= req.body.action.toUpperCase();
    } 
    next();
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(actionUppercase);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res)=>{
    res.json({api: 'Running....'})
})

const port = 6000;
server.listen(port, () => console.log('API running on port 6000'));