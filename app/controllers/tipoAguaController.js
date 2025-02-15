const TipoAgua = require("../models/tipoAgua");

// ✅ Obtener todos los tipos de agua
exports.obtenerTiposAgua = async (req, res) => {
  try {
    const tiposDeAgua = await TipoAgua.find();
    res.status(200).json(tiposDeAgua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de agua", detalle: error.message });
  }
};

// ✅ Crear un nuevo tipo de agua
exports.crearTipoAgua = async (req, res) => {
  try {
    let { tipoDeAgua, tipoPersonalizado, descripcion } = req.body;

    if (!tipoDeAgua || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (tipoDeAgua === "otra" && !tipoPersonalizado) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para el tipo personalizado." });
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

// ✅ Actualizar un tipo de agua
exports.actualizarTipoAgua = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoDeAgua, tipoPersonalizado, descripcion } = req.body;

    if (!tipoDeAgua || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (tipoDeAgua === "otra" && !tipoPersonalizado) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para el tipo personalizado." });
    }

    const tipoAguaActualizado = await TipoAgua.findByIdAndUpdate(
      id,
      { tipoDeAgua, tipoPersonalizado: tipoDeAgua === "otra" ? tipoPersonalizado : null, descripcion },
      { new: true }
    );

    if (!tipoAguaActualizado) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json({ mensaje: "Tipo de agua actualizado con éxito", data: tipoAguaActualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tipo de agua", detalle: error.message });
  }
};

// ✅ Eliminar un tipo de agua
exports.eliminarTipoAgua = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoAguaEliminado = await TipoAgua.findByIdAndDelete(id);

    if (!tipoAguaEliminado) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json({ mensaje: "Tipo de agua eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tipo de agua", detalle: error.message });
  }
};
