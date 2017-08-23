let express = require('express'),
    router = express.Router(),
    acl = require('acl'),
    aclService = require('../services/acl.services'),
    rscService = require('../services/resource.service');

/**
 set routes of ACL
 **/

router.get('/info', getInfo);
router.post('/allow/:user/:role', aclService.setRole);
router.post('/disallow/:user/:role', aclService.unsetRole);

router.get('/roles/', listRoles);
router.get('/resources/', listResources);

router.get('/',getAll);
router.get('/:id',getRole);
router.put('/:id',updateRole);
router.delete('/:id',deleteRole);

module.exports = router;

async function getAll(req, res){
  try{
    res.send({
      message: "todos los roles"
    });
  }
  catch(err) {
    res.send('err',err);
  }
}

async function getInfo(req, res){
  try{
    let info = await aclService.info();
    if(info){
      res.send(info);
    }else{
      res.send(null);
    }
  }
  catch(err) {
    res.send('err',err);
  }
}


async function listResources(req, res){
  try{
    let resources = await rscService.listResources(req,res);
    console.log('resources',resources);
    if(resources){
      res.status(200)
        .send(resources);
    }else{
      res.status(200)
        .send(null);
    }
  }
  catch(err) {
    res.status(400)
      .send(err);
  }
}

async function listRoles(req, res){
  try{
    let roles = await aclService.listRoles();
    console.log('roles',roles);
    if(roles){
      res.status(200)
        .send(roles);
    }else{
      res.status(200)
        .send(null);
    }
  }
  catch(err) {
    res.status(400)
        .send(err);
  }
}

async function getRole(req, res){
  try{
    res.send({
      message: "un role"
    });
  }
  catch(err) {
    res.send('err',err);
  }
}

async function updateRole(req, res){
  try{
    res.send({
      message: "actualizando role"
    })
  }
  catch(err) {
    res.send('err',err);
  }
}

async function deleteRole(req, res){
  try{
    res.send({
      message: "borrando role"
    });
  }
  catch(err) {
    res.send('err',err);
  }
}




