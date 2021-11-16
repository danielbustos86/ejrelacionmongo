//const { populate } = require('../modelos/personas_asignaturas.js');
var Personas_asignatura = require('../modelos/personas_asignaturas.js');
var Persona = require('../modelos/persona.js');
var Profesor = require('../modelos/profesor.js');
var Asignatura = require('../modelos/asignatura.js');
var profesorController = require('../controllers/profesorController');

var funciones = require('../helpers/funciones.js')

function guardarAsignatura_persona(req, res) {

  let asignatura_persona = new Personas_asignatura()
  asignatura_persona.persona = req.body.idPersona
  asignatura_persona.asignatura = req.body.idAsignatura
  asignatura_persona.save((err, asignatura_personasReg) => {

    res.status(200).send({ registroInsertado: asignatura_personasReg })

  })

}

async function  listar(req,res) {
  
  let resultadoFinal=[]
  var filtrado = []
  let termino=false
  await Personas_asignatura.find()
    .populate('persona', 'nombre apellido')
    .populate('asignatura', 'codigo nombre profesor', { nombre: { $eq: 'taller web' } })
    .exec((err, resultado) =>{

       res.send(resultado) 
    })



}

async function buscarCompleta(req,res)
{
  
  var profesores = []; 
  try {
    let asignaturas = await Personas_asignatura.find({persona:"5ee7e153b57cc61ecca5ccfa"}).populate('asignatura'); // sin callback

    for(let doc of asignaturas){    // for of en vez de for in
      let data = await Profesor.findOne({"_id" : doc.asignatura.profesor});
      profesores.push(data);
    }
    res.send(profesores);
  }  catch (err) {
     res.send(err);
  }
}






function listarTodos(req, res) {



  let rut_ingresado = req.query.rut;

  var idPersona

  Persona.find({ rut: rut_ingresado }, (err, persona) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
    if (!persona) return res.status(404).send({ message: 'Error la persona no existe' })

    idPersona = persona[0]._id

    Personas_asignatura.find({ persona: idPersona })
     // .populate('persona', 'rut nombre apellido')
      .populate('asignatura')
      .exec((err, resultado) => {

        res.status(200).send({ persona:persona[0], asignaturas : resultado })
      })

  })





}

module.exports = {
  guardarAsignatura_persona,
  listar,
  listarTodos,
  buscarCompleta
};
