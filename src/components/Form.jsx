import React, { useState, useEffect } from "react";

// Función que devuelve una apreciación textual en base al promedio numérico
const calcularApreciacion = (promedio) => {
  if (promedio < 4.0) return "Deficiente";       // Menor a 4.0
  if (promedio < 5.6) return "Con mejora";       // Entre 4.0 y 5.5
  if (promedio < 6.5) return "Buen trabajo";     // Entre 5.6 y 6.4
  return "Destacado";                            // 6.5 o mas
};

function Formulario({ onAgregar, alumnoEditando }) {
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");

  // Si hay un alumno para editar, se cargan sus datos en los inputs
  useEffect(() => {
    if (alumnoEditando) {
      setNombre(alumnoEditando.nombre);
      setAsignatura(alumnoEditando.asignatura);
      setPromedio(alumnoEditando.promedio);
    }
  }, [alumnoEditando]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene recarga de la página

    // Validación: todos los campos deben estar completos
    if (!nombre || !asignatura || !promedio) {
      alert("Completa todos los campos.");
      return;
    }

    // Crea un nuevo objeto de alumno con apreciación calculada
    const nuevoAlumno = {
      id: alumnoEditando?.id || null, // Mantiene el ID si se está editando
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
      apreciacion: calcularApreciacion(parseFloat(promedio)),
    };

    // Llama a la función recibida por props para agregar/actualizar el alumno
    onAgregar(nuevoAlumno);
    // Resetea los campos del formulario
    setNombre("");
    setAsignatura("");
    setPromedio("");
  };

  // Renderiza el formulario con inputs controlados y un botón dinámico
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Asignatura"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />
      <input
        type="number"
        step="0.1"
        placeholder="Promedio"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />
      <button type="submit">
        {alumnoEditando ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

// Exporta el componente para su uso en otros archivos
export default Formulario;