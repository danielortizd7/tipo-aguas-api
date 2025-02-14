const TipoAgua = require("../models/tipoAgua");

// Obtener todos los tipos de agua
exports.obtenerTiposAgua = async (req, res) => {
  try {
    const tiposDeAgua = await TipoAgua.find();
    res.status(200).json(tiposDeAgua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de agua", detalle: error.message });
  }
};

// Crear un nuevo tipo de agua
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

// Actualizar un tipo de agua
exports.actualizarTipoAgua = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoDeAgua, descripcion } = req.body;

    const tipoAguaActualizado = await TipoAgua.findByIdAndUpdate(
      id,
      { tipoDeAgua, descripcion },
      { new: true }
    );

    if (!tipoAguaActualizado) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json({ mensaje: "Tipo de agua actualizado con éxito", data: tipoAguaActualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tipo de agua", detalle: error.message });
  }
};

// Eliminar un tipo de agua
exports.eliminarTipoAgua = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoAguaEliminado = await TipoAgua.findByIdAndDelete(id);

    if (!tipoAguaEliminado) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json({ mensaje: "Tipo de agua eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tipo de agua", detalle: error.message });
  }
};
