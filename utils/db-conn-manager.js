const mongoose = require('mongoose');
const url = "mongodb+srv://matrixmusic:U1843ebElLrftdCZ@cluster0.549yr.mongodb.net/servers"

const dbConnManager  = {
    connect: () => {
        
        return mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology:true,

        });

    },

    safeConnect: async() => {
        try{
            const mongoose =  await dbConnManager.connect();
            // console.log(`Connected to database; ${url}`);
            return mongoose
        } catch (error){

            console.log("Connection Failed. Error",error);
            console.log("Closing App");
            process.exit();
        }
    },
};

module.exports = dbConnManager;