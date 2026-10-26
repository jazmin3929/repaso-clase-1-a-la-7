
import axios from "axios";
import type { Tarea } from "../types/Tarea";

const API_URL = "http://localhost:3000/tareas";

export const obtenerTareas = async (): Promise<Tarea[]> => {
  const respuesta = await axios.get<Tarea[]>(API_URL);
  return respuesta.data;
};

export const crearTarea = async (
  nuevaTarea: Omit<Tarea, "_id" | "completada" | "createdAt" | "updatedAt">
): Promise<Tarea> => {
  const respuesta = await axios.post<Tarea>(API_URL, nuevaTarea);
  return respuesta.data;
};

export const editarTarea = async (
  id: string,
  cambios: Partial<Omit<Tarea, "_id" | "createdAt" | "updatedAt">>
): Promise<Tarea> => {
  const respuesta = await axios.put<Tarea>(
    `${API_URL}/${id}`,
    cambios
  );
  return respuesta.data;
};

export const eliminarTarea = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

