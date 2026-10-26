
export interface Tarea {
  _id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
  fechaLimite?: string;
  prioridad: "alta" | "media" | "baja";
  etiquetas?: string[];
  createdAt?: string;
  updatedAt?: string;
}