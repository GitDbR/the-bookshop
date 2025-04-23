const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { createAdminAccount } = require('./utils/common');

const app = express();

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('Connected to MongoDB...');
        createAdminAccount();
    })
    .catch(error => console.error(`MongoDB connection error: ${error}`));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})