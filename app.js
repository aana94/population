const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

var routes = require('./routes/population');

const app = express();
app.use(express.text());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/api/population', routes);

// define the port
const port = process.env.PORT || 3000


// create server
app.listen(port, () => { console.log(`I'm on ${port}`) });
