const TipoAgua = require("../models/tipoAgua");

exports.crearTipoAgua = async (req, res) => {
  try {
    const { tipoDeAgua, descripcion } = req.body;

    if (!tipoDeAgua || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoTipoAgua = new TipoAgua({ tipoDeAgua, descripcion });
    await nuevoTipoAgua.save();

    res.status(201).json({ mensaje: "Tipo de agua registrado con éxito", data: nuevoTipoAgua });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar tipo de agua", detalle: error.message });
  }
};
