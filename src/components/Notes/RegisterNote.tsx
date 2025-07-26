import React, { useState } from 'react';
import axios from 'axios';
import './RegisterNote.css';
import { API_URL } from '../../services/apiConfig';

const RegisterNote = () => {
  // Estados para manejar los inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');
  const [state, setState]=useState('PENDING');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un objeto de la nota que se enviará al backend
    const newNote = {
      title: title,
      content: content,
      createAt: new Date(), // Se genera automáticamente
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      state: state
    };

    try {
      // Enviar la solicitud POST al backend
      await axios.post(`${ API_URL }/register/`, newNote);
      // Limpiar los campos del formulario después del envío
      setTitle('');
      setContent('');
      setStartDate('');
      setEndDate('');
      setState('');
      // Mostrar mensaje de éxito en una ventana emergente
      window.alert('Nota registrada con éxito'); // Ventana emergente (alert)
    } catch (error) {
      // Mostrar mensaje de error en una ventana emergente
      window.alert('Error al registrar la nota'); // Ventana emergente (alert)
      console.error('Error al registrar la nota:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contenido:</label>
          <textarea
            className='textarea-content'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className='form-date'>
          <label htmlFor="startDate">Fecha Inicio:</label>
          <input
            type='date'
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="endDate">Fecha Fin:</label>
          <input
            type='date'
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className='form-state'>
          {["PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
            <div
              key={status}
              className={`state-option ${state === status ? status.toLowerCase() : ""}`}
              onClick={() => setState(status)}
            >
              {status === "PENDING" ? "Pendiente" : status === "IN_PROGRESS" ? "En progreso" : "Completado"}
            </div>
          ))}
        </div>
        <button type="submit" className='btn-Registrar'>Registrar Nota</button>
      </form>
    </div>
  );
};

export default RegisterNote;
