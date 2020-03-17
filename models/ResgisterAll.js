const mongoose = require("mongoose");

const RegisterAllSchema = mongoose.Schema({
  nrc: {
    type: String
  },
  st: {
    type: String
  },
  departamento: {
    type: String
  },
  area: {
    type: String
  },
  clave: {
    type: String
  },
  materia: {
    type: String
  },
  hrs_teoria: {
    type: String
  },
  hrs_laboratorio: {
    type: String
  },
  secc: {
    type: String
  },
  cred: {
    type: String
  },
  cupo: {
    type: String
  },
  ucup: {
    type: String
  },
  disp: {
    type: String
  },
  ini: {
    type: String
  },
  fin: {
    type: String
  },
  class_on_monday: {
    type: String
  },
  class_on_tuesday: {
    type: String
  },
  class_on_wednesday: {
    type: String
  },
  class_on_thursday: {
    type: String
  },
  class_on_friday: {
    type: String
  },
  class_on_saturday: {
    type: String
  },
  edificio: {
    type: String
  },
  aula: {
    type: String
  },
  profesor: {
    type: String
  },
  fecha_inicio: {
    type: String
  },
  fecha_fin: {
    type: String
  },
  nivel: {
    type: String
  },
  err: {
    type: String
  },
  err_data: {
    type: String
  }
});

module.exports = mongoose.model("registerAll", RegisterAllSchema);
