// Importar hooks y estilos
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estados para gestionar alumnos y formulario
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Al cargar la app, obtener alumnos desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("alumnos")) || [];
    setAlumnos(guardados);
  }, []);

  // Cada vez que cambien los alumnos, guardarlos en localStorage
  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }, [alumnos]);

  // Calcular texto de escala de apreciación según nota
  const escala = (nota) => {
    if (nota < 4.0) return "Deficiente";
    if (nota < 5.6) return "Con mejora";
    if (nota < 6.5) return "Buen trabajo";
    return "Destacado";
  };

  // Limpiar el formulario
  const limpiar = () => {
    setNombre("");
    setAsignatura("");
    setPromedio("");
    setEditandoId(null);
  };

  // Manejar agregar o actualizar alumno
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !asignatura || !promedio) return;

    const promedioNumerico = parseFloat(promedio);
    if (promedioNumerico < 0 || promedioNumerico > 7) {
      alert("El promedio debe estar entre 0.0 y 7.0");
      return;
    }

    const nuevo = {
      id: editandoId || Date.now(),
      nombre,
      asignatura,
      promedio: promedioNumerico,
    };

    if (editandoId) {
      // Actualizar alumno
      setAlumnos(alumnos.map((a) => (a.id === editandoId ? nuevo : a)));
    } else {
      // Agregar nuevo alumno
      setAlumnos([...alumnos, nuevo]);
    }

    limpiar();
  };

  // Eliminar alumno por ID
  const eliminar = (id) => {
    setAlumnos(alumnos.filter((a) => a.id !== id));
  };

  // Cargar alumno en formulario para editar
  const editar = (alumno) => {
    setNombre(alumno.nombre);
    setAsignatura(alumno.asignatura);
    setPromedio(alumno.promedio);
    setEditandoId(alumno.id);
  };

  // Eliminar todos los alumnos (opcional)
  const eliminarTodo = () => {
    if (window.confirm("¿Estás seguro que quieres eliminar todos los registros?")) {
      setAlumnos([]);
    }
  };

  return (
    <div className="container">
      <h1>Evaluación de Alumnos</h1>

      <div className="card">
        <h2>Agregar Nueva Evaluación</h2>

        <label>
          Nombre Alumno:
          <input
            placeholder="Ej: Juan Perez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label>
          Asignatura:
          <input
            placeholder="Ej: Matemáticas"
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
          />
        </label>

        <label>
          Promedio (0.0 - 7.0):
          <input
            type="number"
            min="0"
            max="7"
            step="0.1"
            placeholder="Ej: 5.5"
            value={promedio}
            onChange={(e) => setPromedio(e.target.value)}
          />
        </label>

        <button onClick={handleSubmit}>
          {editandoId ? "Actualizar Evaluación" : "Agregar Evaluación"}
        </button>
      </div>

      <div className="card">
        <h2>Evaluaciones Guardadas</h2>
        {alumnos.map((a) => (
          <div key={a.id} className="card-evaluacion">
            <p><strong>Alumno:</strong> {a.nombre}</p>
            <p><strong>Asignatura:</strong> {a.asignatura}</p>
            <p><strong>Promedio:</strong> {a.promedio}</p>
            <p><strong>Escala de Apreciación:</strong> <span className="badge">{escala(a.promedio)}</span></p>
            <div className="btns">
              <button className="btn-editar" onClick={() => editar(a)}>Editar</button>
              <button className="btn-eliminar" onClick={() => eliminar(a.id)}>Eliminar</button>
            </div>
          </div>
        ))}

        {alumnos.length > 0 && (
          <button className="btn-eliminar-todo" onClick={eliminarTodo}>
            Eliminar Todos
          </button>
        )}
      </div>

      <div className="card">
        <h2>Escala de Apreciación</h2>
        <ul>
          <li><strong>Deficiente:</strong>   Menor a 4.0</li>
          <li><strong>Con mejora:</strong>   De 4.0 a 5.5</li>
          <li><strong>Buen trabajo:</strong> De 5.6 a 6.4</li>
          <li><strong>Destacado:</strong>    De 6.5 a 7.0</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
