const express = require('express');
const server = express();
server.use(express.json());
const pM = require('./data/helpers/projectModel');
const aM = require('./data/helpers/actionModel');


function logger(req, res, next) {
    console.log([new Date().toISOString()], ` ${req.method}, ${req.url}`)
    next();
    };
    
server.use(logger);

server.get('/', (req,res)=>{
    pM.get().then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.get('/:id', (req,res)=> {
    const id = req.params.id;
    pM.get(id).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.post('/', validateProjectPost, (req, res)=> {
    const body = req.body
    pM.insert(body).then(data=> {
        res.status(201).json(body)
    }).catch(err => {
        res.status(500).json({"error": "internal server error"})
    })
})

server.put('/:id', validateProjectId, validateProjectPost, (req,res)=> {
    const id = req.params.id;
    const body = req.body;
    pM.update(id, body).then(data => {
        res.status(201).json(body)
    }).catch(err => {
        res.status(500).json({"error": "internal server error"})
    })
})

server.delete('/:id', validateProjectId, (req,res)=> {
    const id = req.params.id;
    pM.remove(id).then(data=> {
        res.status(201).send({"deleted": "deleted project"})
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.get('/:id/actions', validateProjectId, (req,res)=> {
    const id = req.params.id;
    pM.getProjectActions(id).then(actions=> {
        res.status(200).json(actions)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.get('/:id/actions/:action_id', validateActionId, validateProjectId, (req,res)=> {
    const actionId = req.params.action_id;
    aM.get(actionId).then(data=> {
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.post('/:id/actions', validateProjectId, validateActionPost, (req,res)=> {
    const body = req.body;
    aM.insert(body).then(data => {
        res.status(200).json(body)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.put('/:id/actions/:action_id', validateActionId, validateProjectId, validateActionPost, (req,res)=> {
    const id = req.params.id;
    const actionId = req.params.action_id;
    const body = req.body;
        aM.update(actionId, body).then(data=> {
        res.status(200).json(req.body)
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

server.delete('/:id/actions/:action_id', validateActionId, validateProjectId, (req,res) => {
    const id = req.params.id;
    const actionId = req.params.action_id;
    console.log(actionId)
    aM.remove(actionId).then(data=> {
        res.status(201).json({"deleted": "deleted action"})
    }).catch(err=>{
        res.status(500).json({"error": "internal server error"})
    })
})

function validateProjectId(req,res,next) {
    const id = req.params.id;
    pM.get(id).then(proj => {
        if(!proj) {
            res.status(400).json({ message: "project id not found on server"})
        }else {
            next();
        }
    })
}

function validateActionId(req,res,next) {
   const actionId = req.params.id;
   aM.get(actionId).then(action => {
    if(!action) {
        res.status(400).json({ message: "action id not found on server"})
    }else {
            next();
    } 
    })
}

function validateActionPost(req,res,next) {
    const body = req.body;
    if(!body.project_id || !body.description || !body.notes){
        res.status(400).json({"message": "must fill out the required field"})
    }else {
        next();
    }
}
function validateProjectPost(req,res,next) {
    const body = req.body;
    if(!body.description || !body.name){
        res.status(400).json({"message": "must fill out the required field"})
    }else {
        next();
    }
}

module.exports = server;