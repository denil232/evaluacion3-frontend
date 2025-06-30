// Importa React desde la librería principal
import React from "react";

// Componente funcional que recibe una lista de alumnos y funciones para editar y eliminar
function ListaAlumnos({ alumnos, onEditar, onEliminar }) {
  return (
    // Estructura de tabla HTML para mostrar los datos
    <table>
      <thead>
        <tr>
          {/*  Encabezados de columna  */}
          <th>Nombre</th>
          <th>Asignatura</th>
          <th>Promedio</th>
          <th>Apreciación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Itera sobre el arreglo de alumnos */}
        {alumnos.map((alumno) => (
          // Cada fila debe tener una "key" única, en este caso el ID del alumno
          <tr key={alumno.id}>
            {/* Muestra los datos del alumno en columnas */}
            <td>{alumno.nombre}</td>
            <td>{alumno.asignatura}</td>
            <td>{alumno.promedio}</td>
            <td>{alumno.apreciacion}</td>
            <td>
              {/* Botón para editar el alumno, llama a la función onEditar con el objeto alumno */}
              <button onClick={() => onEditar(alumno)}>Editar</button>
              {/* Botón para eliminar al alumno, llama a onEliminar con el ID del alumno */}
              <button onClick={() => onEliminar(alumno.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Exporta el componente para que pueda ser utilizado en otros archivos
export default ListaAlumnos;