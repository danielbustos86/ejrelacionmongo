'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Profesor = require('../modelos/profesor.js');

function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let profesor = new Profesor()
    profesor.nombre = req.body.nombre
    profesor.apellido = req.body.apellido
    profesor.edad = req.body.edad
    profesor.rut = req.body.rut

    profesor.save((err, profesorstore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ profesor: profesorstore })

    })
}


function todos(req, res) {

    Profesor.find({},(err,profesor)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!profesor) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({profesor})
     })
}


function buscarId(req, res) {

    Profesor.findById(req.query.id,(err,profesor)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!profesor) return res.status(404).send({message:'Error la persona no existe'})

         res.status(200).send({profesor})
     })
}
async function  buscaInternoId2(id,res) {

    await Profesor.findById(id,(err,profesor)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion'})
        if(!profesor) return res.status(404).send({message:'Error la persona no existe'})

         return res.send({algo:"pp"})
     })
}


 
module.exports = {
    guardar,
   todos,
   buscarId,
   buscaInternoId2
};
