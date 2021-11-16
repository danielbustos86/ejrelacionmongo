'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var persona_routes = require('./routes/personaRoute');
var auto_routes = require('./routes/autoRoute');
var auto_person_routes = require('./routes/autopersonaRoute');

var profesor_routes = require('./routes/profesoreRoute');
var asignatura_routes = require('./routes/asignaturaRoute');
var persona_asignatura_routes = require('./routes/personas_asignaturaRoute');


const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/api',persona_routes);
app.use('/api', auto_routes);
app.use('/api', auto_person_routes);
app.use('/api', profesor_routes);
app.use('/api', asignatura_routes);
app.use('/api', persona_asignatura_routes);

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }

  mongoose.connect(`mongodb://192.99.144.232:27017/grupo1?security=false`, options)
  .then(() => console.log('> Successfully connected to DB'))
  .catch(err => console.log(err))  

    app.listen(4000, () => {

        console.log("Esta corriendo en puerto 4000")
    })