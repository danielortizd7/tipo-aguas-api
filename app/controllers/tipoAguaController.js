exports.crearTipoAgua = async (req, res) => {
  try {
    let { tipoDeAgua, tipoPersonalizado, descripcion } = req.body;

    if (!tipoDeAgua || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Validar si el tipo es "otra", debe tener un nombre personalizado
    if (tipoDeAgua === "otra" && !tipoPersonalizado) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para el tipo de agua personalizado." });
    }

    // Si no es "otra", no debe tener un valor en tipoPersonalizado
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
