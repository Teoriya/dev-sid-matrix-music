const scalability = require('./schemas/scalabilitySchema')
const guildCalls = require('./schemas/serverActSchema')
const { connBoilerPlate } = require('./utils/conn-util')
const fs = require("fs");
const machineId = fs.readdirSync(`./machine/`)[0]

let serversList = {}

module.exports = {
  fetch: connBoilerPlate(async () => {
    // console.log("sax")
    const result = await scalability.findOne(
      { machineId},
    )
    if(result){
    serversList=result.servers
    return
    }
    else{
        await new scalability({
            machineId,
            serversList:[]
          }).save()
    }
  }),
  guildCallInc: connBoilerPlate(async({guildId})=>{
    calls = 1
    await guildCalls.findOneAndUpdate(
        { guildId },
        { guildId,$inc: { calls }, },
        { upsert: true, new: true, }
      )
  }),

  manageLoad: connBoilerPlate(async()=>{
    servers = await guildCalls.find().sort({calls:-1})//server= [1231231,123,12,312,123,1231231,123,12,312,123]
    machines = await scalability.find().sort({machineId:1})//[1,2,3,4,5]
    

    //inprogress
  })

}