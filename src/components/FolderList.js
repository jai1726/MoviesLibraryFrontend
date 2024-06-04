import React, { useState, useEffect } from 'react';
import Header from './Header';
import FolderCard from './FolderCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function FolderList() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const getFolders = async () => {
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const foldersResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getFolders/${userData.data.email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const foldersData = await foldersResponse.json();
      if (foldersData.success) setFolders(foldersData.data);
      else alert(foldersData.message);
    } else {
      alert(userData.message);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const deleteResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/deleteFolder/${userData.data.email}/${folderName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const deleteData = await deleteResponse.json();
      if(deleteData.success) alert("deletedSuccussfully!!");
      else alert(deleteData.message)
      getFolders();
    } else alert(userData.message);
  }

  

  const CreateFolder = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const addResponse = await fetch("https://movieslibrarybackend-2tnj.onrender.com/api/createFolder", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.data.email, folder:folderName })
      });
      const addData = await addResponse.json();
      if(addData.success) alert("Added Succussfully!!")
      else alert(addData.message);
      getFolders();
      setFolderName("")
    } else {
      alert(userData.message);
    }
  }

  const startEdit = (folderName,id) => {
    setIsEditing(true);
    setFolderName(folderName);
    setEditId(id)
  }

  const submitEdit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const editResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/updateFolder/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:userData.data.email,folder:folderName })
      });
      const editData = await editResponse.json();
      if(editData.success) alert("Edited Succussfully!!")
      else alert(editData.message);
      getFolders();
      setIsEditing(false);
      setEditId(null);
      setFolderName("");
    } else {
      alert(userData.message);
    }
  }

  useEffect(() => {
    getFolders();
  }, []);
  console.log("folders",folders);
  return (
    <div>
    <Header />
    <div>
      <form>
        <input name="FolderName" onChange={(e)=>{setFolderName(e.target.value)}} value={folderName} placeholder="CreateNewFolder" />
        <button className="button" onClick={isEditing ?submitEdit :CreateFolder}>
          {isEditing ? <EditIcon /> : <AddIcon />}
        </button>
      </form>
    </div>
    <div className="container">
    {folders.map((folder,index) => (
      <FolderCard
        key={index}
        id={folder._id}
        folderName={folder.folder}
        date={folder.date}
        onDelete={handleDelete}
        onEdit={startEdit}
      />
      
    ))}
    </div>
    
  </div>
  );
}

export default FolderList;
