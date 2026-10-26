
import { useEffect, useState } from "react";
import {
  obtenerTareas,
  editarTarea,
  eliminarTarea,
} from "../services/tareasService";
import type { Tarea } from "../types/Tarea";
import FormularioTarea from "../components/FormularioTarea/FormularioTarea";

function Tareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");
  const [prioridadEditada, setPrioridadEditada] =
    useState<"alta" | "media" | "baja">("media");
  const [procesandoId, setProcesandoId] = useState<string | null>(null);
  const [tareaAEliminar, setTareaAEliminar] = useState<string | null>(null);
  
const cargarTareas = async () => {
    try {
      const datos = await obtenerTareas();
      setTareas(datos);
      setError("");
    } catch {
      setError(
        "No se pudieron cargar las tareas. Verificá que el backend esté funcionando."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const guardarEdicion = async (id: string) => {
    if (!tituloEditado.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    setProcesandoId(id);

    try {
      await editarTarea(id, {
        titulo: tituloEditado.trim(),
        descripcion: descripcionEditada,
        prioridad: prioridadEditada,
      });

      setEditandoId(null);
      setError("");
      await cargarTareas();
    } catch {
      setError("No se pudo actualizar la tarea.");
    } finally {
      setProcesandoId(null);
    }
  };

  
const borrarTarea = async () => {
  if (!tareaAEliminar) return;

  const id = tareaAEliminar;
  setProcesandoId(id);

  try {
    await eliminarTarea(id);

    setTareas((anteriores) =>
      anteriores.filter((tarea) => tarea._id !== id)
    );

    setError("");
    setTareaAEliminar(null);
  } catch {
    setError("No se pudo eliminar la tarea.");
    setTareaAEliminar(null);
  } finally {
    setProcesandoId(null);
  }
};


  const marcarCompletada = async (id: string) => {
    setProcesandoId(id);

    try {
      await editarTarea(id, { completada: true });
      await cargarTareas();
    } catch {
      setError("No se pudo completar la tarea.");
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <main className="container mt-4 mb-5">
      <h1 className="mb-4">Mis tareas</h1>

      <FormularioTarea alCrear={cargarTareas} />

      {error && <p className="text-danger">{error}</p>}

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <ul className="list-group">
          {tareas.map((tarea) => (
            <li className="list-group-item" key={tarea._id}>
              {editandoId === tarea._id ? (
                <div>
                  <label className="form-label">Título</label>
                  <input
                    className="form-control mb-2"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                  />

                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control mb-2"
                    value={descripcionEditada}
                    onChange={(e) =>
                      setDescripcionEditada(e.target.value)
                    }
                  />

                  <label className="form-label">Prioridad</label>
                  <select
                    className="form-select mb-3"
                    value={prioridadEditada}
                    onChange={(e) =>
                      setPrioridadEditada(
                        e.target.value as "alta" | "media" | "baja"
                      )
                    }
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>

                  <button
                    className="btn btn-success me-2"
                    disabled={procesandoId === tarea._id}
                    onClick={() => guardarEdicion(tarea._id)}
                  >
                    Guardar cambios
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditandoId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <h5>{tarea.titulo}</h5>
                  <p>{tarea.descripcion || "Sin descripción"}</p>
                  <p>Prioridad: {tarea.prioridad}</p>
                  <p>
                    Estado: {tarea.completada ? "Completada" : "Pendiente"}
                  </p>

                  <button
                    className="btn btn-warning btn-sm me-2 mb-2"
                    disabled={
                      tarea.completada || procesandoId === tarea._id
                    }
                    onClick={() => {
                      setEditandoId(tarea._id);
                      setTituloEditado(tarea.titulo);
                      setDescripcionEditada(tarea.descripcion || "");
                      setPrioridadEditada(tarea.prioridad);
                      setError("");
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm me-2 mb-2"
                    disabled={procesandoId === tarea._id}
                    onClick={() => setTareaAEliminar(tarea._id)}
                  >
                    Eliminar
                  </button>

                  {!tarea.completada && (
                    <button
                      className="btn btn-success btn-sm mb-2"
                      disabled={procesandoId === tarea._id}
                      onClick={() => marcarCompletada(tarea._id)}
                    >
                      Marcar completada
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      
{tareaAEliminar && (
  <div
    className="modal d-block"
    tabIndex={-1}
    role="dialog"
    aria-modal="true"
    aria-labelledby="tituloModalEliminar"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="tituloModalEliminar">
            Confirmar eliminación
          </h5>

          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={() => setTareaAEliminar(null)}
          />
        </div>

        <div className="modal-body">
          ¿Seguro que querés eliminar esta tarea? Esta acción no se puede deshacer.
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setTareaAEliminar(null)}
            disabled={procesandoId === tareaAEliminar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={borrarTarea}
            disabled={procesandoId === tareaAEliminar}
          >
            {procesandoId === tareaAEliminar
              ? "Eliminando..."
              : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

export default Tareas;
