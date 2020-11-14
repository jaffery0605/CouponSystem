const mongoose = require("mongoose")

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/CoupManDb',{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false},
err => {
    if(!err)
    console.log("connection established successfully");
    else
    console.log('Error while connecting to the server:'+JSON.stringify(err,undefined,2))
}
)