import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import MoviesList  from '../components/MoviesList'
import Header from '../components/Header';
import FolderList from '../components/FolderList';



export default function Login() {
  const [credentials,setCredentials] =useState({email:"",password:""})
  const [loading,setLoading] =useState(0)
  const [forgot,setForgot] =useState(0)
  let navigate=useNavigate()
  const handlesubmit= (event)=>{
    try {
      setLoading(1)
      if(forgot){
        fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/forgotPassword/${credentials.email}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response => response.json()).then(json => {
          setLoading(0);setForgot(0)
          alert(json.message);
        })
      }
      else{
        fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/loginuser/${credentials.email}/${credentials.password}`, {
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response => response.json()).then(json => {
          if(!json.success) alert(json.message)
          else{
            // localStorage.setItem('userEmail',credentials.email)
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
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return(
    <div> 
    {(localStorage.getItem('token'))?<FolderList/>:<>
    <div><Header /></div>
    <div className="wrapper ">
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            MoviesLibrary
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">{!forgot?"Login Here":"enterEmail"}</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>

        {!forgot?<div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>:""}
        <button className="btn  bg-warning" style={{width:'70%'}} onClick={handlesubmit}>{!forgot?'Login':'Submit'}</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}
        {!forgot?<div className='text-center'>
          <button  className="bg-light border-white mt-3 " style={{"width":"70%","color":"black","borderRadius":"10px"}} onClick={()=>{setForgot(1)}}>forgotPassword</button>
          </div>:<button className=" btn m-3 fs-6 " style={{"width":"20%","color":"black"}} onClick={()=>{setForgot(0)}} >back</button>}
        
    </div>
    <Footer /></>}
    </div>
  )
}
