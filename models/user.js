const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    id:{
        type:String,
        maxLength:10
    },
    password:{
        type:String,
        maxLength:16
    },
    token :{
        type:String     
    },
    tokenExp:{
        type:Number
    }
})

const User=mongoose.model('user',userSchema);

module.exports={User}