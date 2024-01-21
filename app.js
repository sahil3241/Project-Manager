const express = require('express');

const app = express();

const tasks = require('./routes/tasks');

const connectDB = require('./db/connect');

const path = require('path');

require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.json());
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')))

// routes
//rest api
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('Server is listening on port ' + port + '...');
        });
        
    }
    catch{
        (error) => {
            console.log(error);
        }
    }
}

start();