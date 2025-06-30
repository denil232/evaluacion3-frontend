import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("alumnos")) || [];
    setAlumnos(guardados);
  }, []);

  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
  }, [alumnos]);

  const escala = (nota) => {
    if (nota < 4.0) return "Deficiente";
    if (nota < 5.6) return "Con mejora";
    if (nota < 6.5) return "Buen trabajo";
    return "Destacado";
  };

  const limpiar = () => {
    setNombre("");
    setAsignatura("");
    setPromedio("");
    setEditandoId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !asignatura || !promedio) return;

    const nuevo = {
      id: editandoId || Date.now(),
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
    };

    if (editandoId) {
      setAlumnos(alumnos.map(a => a.id === editandoId ? nuevo : a));
    } else {
      setAlumnos([...alumnos, nuevo]);
    }

    limpiar();
  };

  const eliminar = (id) => {
    setAlumnos(alumnos.filter(a => a.id !== id));
  };

  const editar = (alumno) => {
    setNombre(alumno.nombre);
    setAsignatura(alumno.asignatura);
    setPromedio(alumno.promedio);
    setEditandoId(alumno.id);
  };
  
  return (
    <div className="container">
      <h1>Evaluación de Alumnos</h1>

      <div className="card">
        <h2>Agregar Nueva Evaluación</h2>

<label>
  Nombre  Alumno:
  <input placeholder="Ej: Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
</label>

<label>
  Asignatura:
  <input placeholder="Ej: Matemáticas" value={asignatura} onChange={(e) => setAsignatura(e.target.value)}/>
</label>

<label>
  Promedio (0.0 - 7.0):
  <input type="number" min="0" max="7" step="0.1" placeholder="Ej: 5.5" value={promedio}onChange={(e) => setPromedio(e.target.value)}/>
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
            <span className="badge">{escala(a.promedio)}</span>
            <div className="btns">
              <button className="btn-editar" onClick={() => editar(a)}>Editar</button>
              <button className="btn-eliminar" onClick={() => eliminar(a.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
