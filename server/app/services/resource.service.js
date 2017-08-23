const all_routes = require('express-list-endpoints');


// listar resources para armar seteo dinamico en acl

function listResources(req,res,next){
  let app = req.app;
  if(app){
    return all_routes(app)
  }else{
    return null
  }
}

module.exports = {
  listResources
}
