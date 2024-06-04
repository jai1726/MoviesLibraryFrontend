import '../index.css';
import React, { useEffect, useState } from 'react';
import Login from './Login'
import Note from '../components/Note';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Home() {
  const [search,setSearch]=useState("");
  const [movies,setMovies]=useState([]);
  const getMovies = async () => {
    const response = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${localStorage.getItem('token')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    if (userData.success) {
      const moviesResponse = await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getAllNotes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const moviesData = await moviesResponse.json();
      console.log("moviesdata",moviesData)
      if (moviesData.success) setMovies(moviesData.data);
      else alert(moviesData.message);
    } 
  };
  useEffect(()=>{
    getMovies();
  },[])
  console.log("movies",movies)
  return (
    <div>
      
      {localStorage.getItem('token')?
      <>
       <Header/>
    <div className="d-flex m-3 justify-content-center ">
      <button className="btn btn-outline-success text-white bg-success" style={{'margin-right': '10px'}} >Search</button>
      <input className="form-control " type="search" placeholder="Search"  aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
       </div>
      <div className="container">
      <div className="row">
        {movies.filter((item)=> (String(item.name).toLowerCase().includes(String(search).toLowerCase())) && !item.private).map((noteItem, index) => (
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
              self={false}
            />
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    </>
      :<Login/>}
      
    </div>
  )
}
