const TipoAgua = require('../models/tipoAgua');

class TipoAguaService {
    static async obtener() {
        return await TipoAgua.find();
    }

    static async registrar(datos) {
        try {
            const nuevoTipo = new TipoAgua({
                nombre: datos.nombre,
                descripcion: datos.descripcion
            });

            await nuevoTipo.save();
            return nuevoTipo;
        } catch (error) {
            console.error("❌ Error en registrarTipoAgua:", error);
            throw new Error(`Error al registrar el tipo de agua: ${error.message}`);
        }
    }

    static async eliminar(id) {
        return await TipoAgua.findByIdAndDelete(id);
    }

    static async actualizar(id, datos) {
        return await TipoAgua.findByIdAndUpdate(id, datos, { new: true });
    }
}

module.exports = TipoAguaService;
