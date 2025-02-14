const mongoose = require("mongoose");

// Esquema del modelo
const tipoAguaSchema = new mongoose.Schema(
  {
    _id: { type: String }, // Se generará antes de guardar
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true }
  },
  { 
    versionKey: false, 
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      }
    }
  }
);

// Generar ID personalizado antes de guardar
tipoAguaSchema.pre("save", async function (next) {
  if (!this._id) {
    let nuevoId;
    let existe;

    do {
      // Contar documentos y generar un ID nuevo
      const count = await mongoose.model("TipoAgua").countDocuments();
      nuevoId = `H${(count + 1).toString().padStart(2, "0")}`;

      // Verificar si ya existe en la BD
      existe = await mongoose.model("TipoAgua").findById(nuevoId);
    } while (existe); // Si el ID ya existe, genera otro

    this._id = nuevoId;
  }
  next();
});

// Modelo
const TipoAgua = mongoose.model("TipoAgua", tipoAguaSchema);
module.exports = TipoAgua;
