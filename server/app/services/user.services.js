let config = require('../../config')
let mongoose = require('mongoose')
//let db = mongoose.connect(config.connectionString, { useMongoClient: true })
let User = mongoose.model('User')

let service = {}

service.getAll = getAll
service.getCurrent = getCurrent
service.update = update
service.remove = remove

module.exports = service

async function getAll(){
  return  await User.find();
}

function getCurrent(){}
function update(){}
function remove(_id){
  User.remove({ _id: _id }, function(err,user){
    console.log('user',user)
  })
}
