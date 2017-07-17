let config = require('../../config')
let express = require('express')
let router = express.Router()
//agregar servicio
let userService = require('../services/user.services')

//routes
router.get('/',getAll);
router.get('/current',getCurrent)
router.put('/:_id',update)
router.delete('/:_id',remove)

module.exports = router

async function getAll(req,res){
  try{
    let user = await userService.getAll()
    res.send(user)
  }catch (err){
    res.status(400).send(err)
  }
}

function getCurrent(){

}

function update(){

}

async function remove(req,res){
  console.log('params',req.params)
  try{
    let user = await userService.remove(req.params._id)
    res.sendStatus(200)
  }catch (err){
    res.status(400).send(err)
  }
}
