const TipoAgua = require("../models/tipoAgua");

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
      tipoPersonalizado = null; // Si no es "otra", limpiar este campo
    }

    // ✅ Buscar el último ID válido y generar uno nuevo
    const ultimoRegistro = await TipoAgua.findOne({ _id: /^H\d{2}$/ }).sort({ _id: -1 });

    let nuevoId;
    if (ultimoRegistro) {
      const ultimoNumero = parseInt(ultimoRegistro._id.replace("H", ""), 10);
      nuevoId = `H${(ultimoNumero + 1).toString().padStart(2, "0")}`;
    } else {
      nuevoId = "H01"; // Si no hay registros previos, empezar desde H01
    }

    // Crear nuevo documento
    const nuevoTipoAgua = new TipoAgua({
      _id: nuevoId,
      tipoDeAgua,
      tipoPersonalizado,
      descripcion
    });

    await nuevoTipoAgua.save();

    res.status(201).json({ mensaje: "Tipo de agua registrado con éxito", data: nuevoTipoAgua });

  } catch (error) {
    // ✅ Manejo específico de error de clave duplicada
    if (error.code === 11000) {
      return res.status(400).json({ error: "El ID ya existe, intenta nuevamente." });
    }
    res.status(500).json({ error: "Error al registrar tipo de agua", detalle: error.message });
  }
};

// ✅ Obtener todos los tipos de agua
exports.obtenerTiposAgua = async (req, res) => {
  try {
    const tiposAgua = await TipoAgua.find();
    res.status(200).json(tiposAgua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de agua", detalle: error.message });
  }
};

// ✅ Obtener un tipo de agua por ID
exports.obtenerTipoAguaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoAgua = await TipoAgua.findById(id);

    if (!tipoAgua) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json(tipoAgua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tipo de agua", detalle: error.message });
  }
};

// ✅ Actualizar un tipo de agua por ID
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
      { tipoDeAgua, tipoPersonalizado, descripcion },
      { new: true }
    );

    if (!tipoAguaActualizado) {
      return res.status(404).json({ error: "Tipo de agua no encontrado" });
    }

    res.status(200).json({
      mensaje: "Tipo de agua actualizado con éxito",
      data: tipoAguaActualizado
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tipo de agua", detalle: error.message });
  }
};

// ✅ Eliminar un tipo de agua por ID
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
