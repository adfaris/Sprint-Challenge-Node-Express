const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res)=> {
    // console.log("I am here", req, res)
    db
    .get()
    .then(actions=>{
        res.json(actions);
    })
    .catch(error=>{
        res.status(500).json({error: 'Server error'})
    })
})

router.get('/:id', (req, res)=> {
    const {id} = req.params;
    db
    .get(id)
    .then(actions=>{
        res.json(actions);
    })
    .catch(error=>{
        res.status(500).json({error: 'Server error'})
    })
})

router.post('/', (req, res)=>{
    const action = req.body;
    // console.log(action);
    db
    .insert(action)
    .then(response=>{
        res.json(response)
    })
    .catch(error=>{
        res.status(500).json({error:'server error'})
    })
})

router.delete('/:id', (req, res)=>{
    const { id }= req.params;
    db
    .remove(id)
    .then(deleted=>{
        if(deleted===1) res.json({success: `the action with id ${id} is successfully deleted`})
        if(deleted===0) res.status(400).json({error:'the action with the given id does not exist'})
    })
    .catch(error=>{
        res.status(500).json({error:'Server error'})
    })
})

router.put('/:id', (req,res)=>{
    const {id } = req.params;
    const action = req.body;
    db
    .update(id,action)
    .then (posts=>{
        res.status(200).json(post)
    })
    .catch(error=>{
        res.status(500).json(error);
    })
})




module.exports=router;