const { model, Schema } = require('mongoose');
const {reqString,reqNumber} = require('../utils/datatypes');

const guildCalls = Schema({
  guildId: reqString,
  calls: reqNumber
});

module.exports = model('guildCalls', guildCalls);