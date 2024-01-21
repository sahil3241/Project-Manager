const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser:true, // All of these are used to hide the warnings
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
}

module.exports = connectDB

