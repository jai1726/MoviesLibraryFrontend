import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import { useParams } from "react-router-dom";

function FolderMovies() {
  const param = useParams();  
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [details, setDetails] = useState({ title: "", genere: "", cast: "", director: "", imageUrl: "" });
  const [loading, setLoading] = useState(0);
  const [isPublic, setPublic] = useState(1);
  const [search,setSearch]=useState("");
  const [add,setAdd]=useState(0);
  const getMovies = async () => {
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const moviesResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getNotesByFolder/${userData.data.email}/${param.folderName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const moviesData = await moviesResponse.json();
      if (moviesData.success) setMovies(moviesData.data);
      else alert(moviesData.message);
    } else {
      alert(userData.message);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const deleteResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/deleteNote/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const deleteData = await deleteResponse.json();
      alert("Movie deleted succussfully!");
      getMovies();
    } else alert(userData.message);
  };

  const submitNote = async (event) => {
    setLoading(1)
    event.preventDefault();
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const addResponse = await fetch("https://movieslibrarybackend-2tnj.onrender.com/api/createNote", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: userData.data.email,
          folder: param.folderName,
          name: details.title,
          genere: details.genere,
          stars: details.cast,
          creator: details.director,
          imageUrl: details.imageUrl,
          private: (1 - isPublic)
        })
      });
      setLoading(0);
      const addData = await addResponse.json();
      alert("Note Added Successfully!!");
      getMovies();
      setDetails({ title: "", genere: "", cast: "", director: "", imageUrl: "" });
      setLoading(0);
    } else {
      setLoading(0);
      alert(userData.message);
    }
  };

  const startEdit = (index,id) => {
    setAdd(1)
    setIsEditing(true);
    setEditId(id);
    setDetails({
      title: movies[index].name,
      genere: movies[index].genere,
      cast: movies[index].stars,
      director: movies[index].creator,
      imageUrl: movies[index].imageUrl,
      
    });
    setPublic(1-movies[index].private);
  };

  const onChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const submitEdit = async (event) => {
    setLoading(1)
    event.preventDefault();
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const editResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/updateNote/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.data.email,
          folderName: param.folderName,
          title: details.title,
          genere: details.genere,
          cast: details.cast,
          director: details.director,
          imageUrl: details.imageUrl,
          private: (1 - isPublic)
        })
      });
      setLoading(0);
      const editData = await editResponse.json();
      alert("Note Updated Successfully!!");
      getMovies();
      setIsEditing(false);
      setEditId(null);
      setDetails({ title: "", genere: "", cast: "", director: "", imageUrl: "" });
    } else {
      setLoading(0);
      alert(userData.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies)
  return (
    <div>
      <Header />
      <button className="btn  bg-success m-1" style={{width:'30%'}} onClick={()=>(setAdd(1))}>AddMovie</button>
      {add?
      <div className="wrapper">
        <div className="logo">
          <img src={require('../websiteLogo.jpg')} alt="" />
        </div>
        <div className="text-center m-4 name text-success">
          MoviesLibrary
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">Add Movie Here</label></div>
        <div className="form-field d-flex align-items-center">
          <input placeholder="title" name="title" value={details.title} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
          <input placeholder="genere" name="genere" value={details.genere} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
          <input placeholder="star cast" name="cast" value={details.cast} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
          <input placeholder="director" name="director" value={details.director} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
          <input placeholder="imageUrl" name="imageUrl" value={details.imageUrl} onChange={onChange} />
        </div>
        <button 
          className={isPublic ? "btn bg-success m-2" : "btn bg-white m-2"} 
          style={{ width: '40%', color: "black" }} 
          onClick={() => setPublic(1)}
        >
          Public
        </button>
        <button 
          className={isPublic ? "btn bg-white m-2" : "btn bg-success m-2"} 
          style={{ width: '40%', color: "black" }} 
          onClick={() => setPublic(0)}
        >
          Private
        </button>
        <button 
          className="btn bg-warning m-1" 
          style={{ width: '50%' }} 
          onClick={isEditing ? submitEdit : submitNote}
        >
          {isEditing ? "Update" : "Add"}
        </button>
        {loading ? <div className="spinner-border" role="status"><span className="visually-hidden text-center">Loading...</span></div>
        :<button className="btn  bg-warning" style={{width:'30%'}} onClick={()=>(setAdd(0))}>Cancel</button>
        }
      </div>
      :""}
      <div className="d-flex m-3 justify-content-center ">
      <button className="btn btn-outline-success text-white bg-success" style={{'margin-right': '10px'}} >Search</button>
      <input className="form-control " type="search" placeholder="Search"  aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
       </div>
      <div className="container">
        <div className="row">
          {movies.filter((item)=> (String(item.name).toLowerCase().includes(String(search).toLowerCase()))).map((noteItem, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <Note
                index={index}
                id={noteItem._id}
                name={noteItem.name}
                genere={noteItem.genere}
                date={noteItem.date}
                creator={noteItem.creator}
                folder={noteItem.folder}
                stars={noteItem.stars}
                imageUrl={noteItem.imageUrl}
                private={noteItem.private}
                onDelete={handleDelete}
                onEdit={startEdit}
                self={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderMovies;
