import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function MoviesList() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const getNotes = async () => {
    const response = await fetch(`http://localhost:4000/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const notesResponse = await fetch(`http://localhost:4000/api/getNotes/${userData.data.email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const notesData = await notesResponse.json();
      if (notesData.success) setNotes(notesData.data);
      else alert(notesData.message);
    } else {
      alert(userData.message);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const deleteResponse = await fetch(`http://localhost:4000/api/deleteNote/${userData.data.email}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const deleteData = await deleteResponse.json();
      alert(deleteData.message);
      getNotes();
    } else alert(userData.message);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  const submitNote = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const addResponse = await fetch("http://localhost:4000/api/addNote", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.data.email, note: note })
      });
      const addData = await addResponse.json();
      alert(addData.message);
      getNotes();
      setNote({ title: "", content: "" });
    } else {
      alert(userData.message);
    }
  }

  const startEdit = (id) => {
    setIsEditing(true);
    setEditId(id);
    setNote({
      title: notes[id].title,
      content: notes[id].content
    });
  }

  const submitEdit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const editResponse = await fetch(`http://localhost:4000/api/updateNote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:userData.data.email,id:editId,note: note })
      });
      const editData = await editResponse.json();
      alert(editData.message);
      getNotes();
      setIsEditing(false);
      setEditId(null);
      setNote({ title: "", content: "" });
    } else {
      alert(userData.message);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);
  console.log(notes)
  return (
    <div>
      <Header />
      <div>
        <form>
          <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <button className="button" onClick={isEditing ? submitEdit : submitNote}>
            {isEditing ? <EditIcon /> : <AddIcon />}
          </button>
        </form>
      </div>
      <div className="container">
      {notes.map((noteItem,index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          date={noteItem.date}
          onDelete={handleDelete}
          onEdit={startEdit}
        />
        
      ))}
      </div>
      
    </div>
  )
}

export default MoviesList;
