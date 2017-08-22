let express = require('express'),
    router = express.Router(),
    acl = require('acl'),
    aclService = require('../services/acl.services');

/**
 set routes of ACL
 **/

router.get('/info', aclService.info);
router.post('/allow/:user/:role', aclService.setRole);
router.post('/disallow/:user/:role', aclService.unsetRole);

router.get('/roles/', aclService.listRoles);

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




