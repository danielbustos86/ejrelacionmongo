'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonaSchema = Schema(
    {
      nombre:String,
      apellido:String,
      rut:String,
      edad:{type:Number},
      telefonos:[{descripcion:String,numero:{type:Number}}]
      
    })

module.exports = mongoose.model('personas',PersonaSchema)    