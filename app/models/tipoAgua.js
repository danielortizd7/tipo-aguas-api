const mongoose = require("mongoose");

// Esquema del modelo
const tipoAguaSchema = new mongoose.Schema(
  {
    _id: { type: String }, // ID personalizado
    tipoDeAgua: { 
      type: String, 
      required: true, 
      trim: true, 
      enum: ["potable", "natural", "residual", "otra"], // Se mantiene la validación
    },
    tipoPersonalizado: { // Nuevo campo para guardar un tipo de agua cuando es "otra"
      type: String,
      trim: true,
      required: function () { return this.tipoDeAgua === "otra"; } // Requerido solo si tipoDeAgua es "otra"
    },
    descripcion: { 
      type: String, 
      required: true, 
      trim: true 
    }
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

// Generar ID personalizado 
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
