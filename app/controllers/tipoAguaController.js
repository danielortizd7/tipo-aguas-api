const TipoAgua = require("../models/tipoAgua");

// ✅ Agregamos la función que falta
exports.obtenerTiposAgua = async (req, res) => {
  try {
    const tiposDeAgua = await TipoAgua.find();
    res.status(200).json(tiposDeAgua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de agua", detalle: error.message });
  }
};

// ✅ Tu función de crear está bien
exports.crearTipoAgua = async (req, res) => {
  try {
    let { tipoDeAgua, tipoPersonalizado, descripcion } = req.body;

    if (!tipoDeAgua || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (tipoDeAgua === "otra" && !tipoPersonalizado) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para el tipo de agua personalizado." });
    }

    if (tipoDeAgua !== "otra") {
      tipoPersonalizado = null;
    }

    const nuevoTipoAgua = new TipoAgua({ tipoDeAgua, tipoPersonalizado, descripcion });
    await nuevoTipoAgua.save();

    res.status(201).json({ mensaje: "Tipo de agua registrado con éxito", data: nuevoTipoAgua });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar tipo de agua", detalle: error.message });
  }
};
