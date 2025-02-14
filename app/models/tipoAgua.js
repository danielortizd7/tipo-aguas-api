const mongoose = require("mongoose");

// Esquema del modelo
const tipoAguaSchema = new mongoose.Schema(
  {
    _id: { type: String, default: null }, // Se generará antes de guardar
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true }
  },
  { 
    versionKey: false, 
    timestamps: true, // Se guarda en la BD pero se oculta en la API
    toJSON: {
      transform: function (doc, ret) {
        delete ret.createdAt; // Oculta createdAt
        delete ret.updatedAt; // Oculta updatedAt
        return ret;
      }
    }
  }
);

// Generar ID personalizado antes de guardar
tipoAguaSchema.pre("save", async function (next) {
  if (!this._id) {
    const count = await mongoose.model("TipoAgua").countDocuments();
    this._id = `H${(count + 1).toString().padStart(2, "0")}`; // H01, H02...
  }
  next();
});

// Modelo
const TipoAgua = mongoose.model("TipoAgua", tipoAguaSchema);
module.exports = TipoAgua;
