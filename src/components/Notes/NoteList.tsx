import React, { useEffect, useState } from 'react';
import { getNotes } from '../../services/api';
import './NoteList.css';
import Table from './Table';
import ViewNote from './ViewNote';
import StateCircle from './StateCiercleProps';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  state: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

export const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        setNotes(notesData);
        setFilteredNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const handleViewNote = (index: number) => {
    setSelectedNoteIndex(index);
  };

  const handleNext = () => {
    setSelectedNoteIndex((prevIndex) => {
      if (prevIndex !== null && prevIndex < filteredNotes.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrev = () => {
    setSelectedNoteIndex((prevIndex) => {
      if (prevIndex !== null && prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter(note => note.id !== noteId);
      setFilteredNotes(newNotes);

      if (selectedNoteIndex !== null) {
        if (newNotes.length === 0) {
          setSelectedNoteIndex(null);
        } else if (selectedNoteIndex >= newNotes.length) {
          setSelectedNoteIndex(newNotes.length - 1);
        }
      }

      return newNotes;
    });
  };

  type TableRow = {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
    statusLabel: string;
    statusCircle: React.ReactNode;
    view: React.ReactNode;
  };

  // Datos para la tabla
  const data: TableRow[] = filteredNotes.map((note, index) => ({
    id: note.id,
    title: note.title,
    dateStart: note.startDate.split("T")[0],
    dateEnd: note.endDate.split("T")[0],
    statusLabel:
      note.state === "PENDING"
        ? "Pendiente"
        : note.state === "IN_PROGRESS"
        ? "En progreso"
        : "Completado",
    statusCircle: <StateCircle state={note.state} />,
    view: <button className="btn-view" onClick={() => handleViewNote(index)}>Abrir</button>,
  }));

  const columns: { key: keyof TableRow; label: string }[] = [
    { key: "title", label: "Título" },
    { key: "dateStart", label: "Fecha Inicio" },
    { key: "dateEnd", label: "Fecha Fin" },
    { key: "statusLabel", label: "Estado" },
    { key: "statusCircle", label: " " },
    { key: "view", label: "Abrir" },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título o contenido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {selectedNoteIndex !== null && selectedNoteIndex < filteredNotes.length ? (
        <ViewNote
          key={selectedNoteIndex} // para forzar render
          note={filteredNotes[selectedNoteIndex]}
          onClose={() => setSelectedNoteIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          setNotes={setNotes}
          setFilteredNotes={setFilteredNotes}
          onDelete={handleDeleteNote}
        />
      ) : (
        <div>
          <Table data={data} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default NoteList;
