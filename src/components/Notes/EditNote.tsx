import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNoteEdit } from '../../services/api';
import './EditNote.css';

type NoteState = 'PENDING' | 'COMPLETED' | 'IN_PROGRESS';

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState<NoteState>('PENDING');

  /* Formatea fecha como YYYY-MM-DD
  const formatDate = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  };
  */

  // Formatea fecha completa (con hora)
  const formatDateTime = (date: Date) => {
    return date.toISOString().split('.')[0];
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteId = Number(id);
        if (!isNaN(noteId)) {
          const note = await getNoteById(noteId);
          console.log('Nota obtenida:', note);
          setTitle(note.title);
          setContent(note.content);
          setStartDate(note.startDate ? note.startDate.split('T')[0] : '');
          setEndDate(note.endDate ? note.endDate.split('T')[0] : '');
          setState(note.state || 'PENDING');
        } else {
          console.error('ID no válido');
        }
      } catch (error) {
        console.error('Error al obtener la nota para editar:', error);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !state) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    try {
      const formattedStartDate = formatDateTime(new Date(startDate));
      const formattedEndDate = formatDateTime(new Date(endDate));

      const updatedNote = {
        title,
        content,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        state,
      };

      await updateNoteEdit(Number(id), updatedNote);
      alert('Nota actualizada con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
      alert('Error al actualizar la nota');
    }
  };

  return (
    <div>
      <h2>Editar Nota</h2>
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
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Fecha de fin:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-state">
          {(['PENDING', 'IN_PROGRESS', 'COMPLETED'] as NoteState[]).map((status) => (
            <div
              key={status}
              className={`state-option ${state === status ? status.toLowerCase() : ''}`}
              onClick={() => setState(status)}
            >
              {status === 'PENDING'
                ? 'Pendiente'
                : status === 'IN_PROGRESS'
                ? 'En progreso'
                : 'Completada'}
            </div>
          ))}
        </div>
        <button type="submit" className="btn-edit">
          Actualizar Nota
        </button>
      </form>
    </div>
  );
};

export default EditNote;
