let express = require('express'),
  router = express.Router(),
  rscService = require('../services/resource.service');

/**
 set routes of ACL
 **/

router.get('/info', getInfo);
router.post('/allow/:user/:role', aclService.setRole);
router.post('/disallow/:user/:role', aclService.unsetRole);

router.get('/roles/', listRoles);
router.get('/resources/', )

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
