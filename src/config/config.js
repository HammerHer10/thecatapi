const mongoose = require('mongoose');

const config = {
    port: process.env.PORT || 3000,
    apiKey: process.env.CAT_API_KEY ,
    catApiBaseUrl: 'https://api.thecatapi.com/v1',
    mongoUri: process.env.MONGO_URI, 
};

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);  
    }
};

module.exports ={
    config,
    connectDB
};
