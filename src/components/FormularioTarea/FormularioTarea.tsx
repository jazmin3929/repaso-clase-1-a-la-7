
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { crearTarea } from "../../services/tareasService";

interface DatosFormulario {
  titulo: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  fechaLimite: string;
  etiquetas: string;
}

interface Props {
  alCrear: () => Promise<void>;
}

const FormularioTarea = ({ alCrear }: Props) => {
  const [mensaje, setMensaje] = useState("");

  const formik = useFormik<DatosFormulario>({
    initialValues: {
      titulo: "",
      descripcion: "",
      prioridad: "media",
      fechaLimite: "",
      etiquetas: "",
    },

    validationSchema: Yup.object({
      titulo: Yup.string()
        .trim()
        .required("El título es obligatorio")
        .max(100, "El título no puede superar los 100 caracteres"),
      descripcion: Yup.string().max(
        500,
        "La descripción no puede superar los 500 caracteres"
      ),
      prioridad: Yup.string()
        .oneOf(["alta", "media", "baja"], "Seleccioná una prioridad válida")
        .required("La prioridad es obligatoria"),
      fechaLimite: Yup.string().test(
        "fecha-valida",
        "La fecha límite no es válida",
        (valor) => !valor || !Number.isNaN(Date.parse(valor))
      ),
      etiquetas: Yup.string().max(
        200,
        "Las etiquetas no pueden superar los 200 caracteres"
      ),
    }),

    onSubmit: async (valores, { resetForm }) => {
      setMensaje("");

      try {
        await crearTarea({
          titulo: valores.titulo.trim(),
          descripcion: valores.descripcion,
          prioridad: valores.prioridad,
          ...(valores.fechaLimite && {
            fechaLimite: valores.fechaLimite,
          }),
          etiquetas: valores.etiquetas
            .split(",")
            .map((etiqueta) => etiqueta.trim())
            .filter(Boolean),
        });

        await alCrear();
        resetForm();
        setMensaje("¡Tarea creada correctamente!");
      } catch {
        setMensaje("No se pudo crear la tarea. Revisá la conexión.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="card card-body mb-4">
      <h2 className="h4">Crear tarea</h2>

      <label htmlFor="titulo" className="form-label">
        Título *
      </label>
      <input
        id="titulo"
        name="titulo"
        maxLength={100}
        className="form-control"
        value={formik.values.titulo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.titulo && formik.errors.titulo && (
        <p className="text-danger">{formik.errors.titulo}</p>
      )}

      <label htmlFor="descripcion" className="form-label mt-3">
        Descripción
      </label>
      <textarea
        id="descripcion"
        name="descripcion"
        maxLength={500}
        className="form-control"
        value={formik.values.descripcion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.descripcion && formik.errors.descripcion && (
        <p className="text-danger">{formik.errors.descripcion}</p>
      )}

      <label htmlFor="prioridad" className="form-label mt-3">
        Prioridad
      </label>
      <select
        id="prioridad"
        name="prioridad"
        className="form-select"
        value={formik.values.prioridad}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <label htmlFor="fechaLimite" className="form-label mt-3">
        Fecha límite
      </label>
      <input
        id="fechaLimite"
        name="fechaLimite"
        type="date"
        className="form-control"
        value={formik.values.fechaLimite}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.fechaLimite && formik.errors.fechaLimite && (
        <p className="text-danger">{formik.errors.fechaLimite}</p>
      )}

      <label htmlFor="etiquetas" className="form-label mt-3">
        Etiquetas (separadas por comas)
      </label>
      <input
        id="etiquetas"
        name="etiquetas"
        maxLength={200}
        className="form-control"
        placeholder="estudio, programación"
        value={formik.values.etiquetas}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.etiquetas && formik.errors.etiquetas && (
        <p className="text-danger">{formik.errors.etiquetas}</p>
      )}

      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Creando..." : "Crear tarea"}
      </button>

      {mensaje && <p className="mt-3 mb-0">{mensaje}</p>}
    </form>
  );
};

export default FormularioTarea;
