const mongoose = require("mongoose");

const tipoAguaSchema = new mongoose.Schema({
  _id: { type: String }, // ID personalizado
  tipoDeAgua: { 
    type: String, 
    required: true, 
    trim: true, 
    enum: ["potable", "natural", "residual", "otra"], // No acepta "dulce"
  },
  tipoPersonalizado: { 
    type: String,
    trim: true,
    required: function () { return this.tipoDeAgua === "otra"; }
  },
  descripcion: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { 
  versionKey: false, 
  timestamps: true
});

// Modelo
const TipoAgua = mongoose.model("TipoAgua", tipoAguaSchema);
module.exports = TipoAgua;
