const { model, Schema } = require('mongoose');
const {reqString} = require('../utils/datatypes');

const scalability = Schema({
  machineId: reqString,
  servers: [reqString]
});

module.exports = model('servers', scalability);