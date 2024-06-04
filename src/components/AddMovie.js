import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';



export default function Login() {
  const [details,setdetails] =useState({title:"",genere:"",cast:"",director:"",imageUrl:""})
  const [loading,setLoading] =useState(0)
  const [forgot,setForgot] =useState(0)
  let navigate=useNavigate()
  const handlesubmit= (event)=>{
    try {
      setLoading(1)
      if(forgot){
        fetch(`http://localhost:4000/api/forgotPassword/${details.email}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response => response.json()).then(json => {
          setLoading(0);setForgot(0)
          alert(json.message);
        })
      }
      else{
        fetch(`http://localhost:4000/api/loginuser/${details.email}/${details.password}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response => response.json()).then(json => {
          if(!json.success) alert(json.message)
          else{
            // localStorage.setItem('userEmail',details.email)
            localStorage.setItem('token',json.data)
            navigate("/");
          }
          setLoading(0)
        })
      }
      
    } catch (error) {
      setLoading(0)
      alert("Somthing went wrong try later")
    }
  }
  const onChange=(event)=>{
    setdetails({...details,[event.target.name]:event.target.value})
  }

  return(
    <div> 
    <div><Header /></div>
    <div className="wrapper ">
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            MoviesLibrary
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">AddMovieHere</label></div>
        <div className="form-field d-flex align-items-center">
            <input  placeholder="title"  value={details.title} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <input  placeholder="genere"  value={details.genere} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <input  placeholder="star cast"  value={details.cast} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <input  placeholder="director"  value={details.director} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <input  placeholder="imageUrl"  value={details.imageUrl} onChange={onChange}/>
        </div>
        <button className="btn  bg-warning" style={{width:'70%'}} onClick={handlesubmit}>Add</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}
        
        
    </div>
    <Footer />
    </div>
  )
}
