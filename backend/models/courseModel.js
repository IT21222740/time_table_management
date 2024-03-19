const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the course name"]
    },
    code:{
        type:String,
        required:[true,"Please add the course code"]
    },
    credits:{
        type:String,
        required:[true,"Please add the course credits"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Course",courseSchema);