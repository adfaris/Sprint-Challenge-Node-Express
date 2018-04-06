const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel.js');

router.get('/', (req, res)=> {
    db
    .get()
    .then(projects=>{
        res.json(projects);
    })
    .catch(error=>{
        res.status(500).json({error: 'Server error'})
    })
})

router.get ('/:id', (req,res)=>{
    const { id } = req.params;
    db
    .get(id)
    .then(projects=>{
        res.json(projects[0])
    })
    .catch(error=>{
        res.status(500).json({error: 'Server error'})
    })
})

router.get ('/:id', (req,res)=>{
    const { id } = req.params;
    db
    .getProjectActions(id)
    .then(projects=>{
        res.json(projects)
    })
    .catch(error=>{
        res.status(500).json({error: 'Server error'})
    })
})

router.post('/', (req, res)=>{
    const project = req.body
    if(typeof project.name !=='string') res.status(400).json({error:'name should be of type string'});
    db
    .insert(project)
    .then (projects=>{
        res.json(projects)
    })
    .catch(error=>{
        res.status(500).json({error:'Server error'})
    })
})

router.delete('/:id', (req, res)=>{
    const { id }= req.params;
    db
    .remove(id)
    .then(deleted=>{
        if(deleted===1) res.json({success: `the project with id ${id} is successfully deleted`})
        if(deleted===0) res.status(400).json({error:`the project with the given ${id} does not exist`})
    })
    .catch(error=>{
        res.status(500).json({error:'Server error'})
    })
})

router.put('/:id', (req,res)=>{
    const {id } = req.params;
    const project = req.body;
    db
    .update(id,project)
    .then (posts=>{
        res.status(200).json(post)
    })
    .catch(error=>{
        res.status(500).json(error);
    })
})

module.exports=router;
