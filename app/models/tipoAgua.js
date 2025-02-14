const mongoose = require("mongoose");

// Esquema del modelo
const tipoAguaSchema = new mongoose.Schema(
  {
    _id: { type: String }, // Se generará antes de guardar
    "tipo de agua": { 
      type: String, 
      required: true, 
      trim: true, 
      enum: ["potable", "natural", "residual", "otra"] // Solo permite estos valores
    },
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
      const count = await mongoose.model("TipoAgua").countDocuments();
      nuevoId = `H${(count + 1).toString().padStart(2, "0")}`;
      existe = await mongoose.model("TipoAgua").findById(nuevoId);
    } while (existe); 

    this._id = nuevoId;
  }
  next();
});

// Modelo
const TipoAgua = mongoose.model("TipoAgua", tipoAguaSchema);
module.exports = TipoAgua;
