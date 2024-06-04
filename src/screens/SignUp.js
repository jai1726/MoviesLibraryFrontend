import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Header from '../components/Header';
export default function Signup() {
  const [credentials,setCredentials] =useState({name:"",email:"",password:"",confirmPassword:""})
  const [loading,setLoading] =useState(0)
  let navigate=useNavigate();
  const handlesubmit=(event)=>{
    try {
      if(credentials.password!=credentials.confirmPassword){
        alert("conform Password is not matching");return;
      }
      setLoading(1)
      fetch("https://movieslibrarybackend-2tnj.onrender.com/api/createUser", {
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      }).then(response => response.json()).then(json => {
        if(json.success){
          alert("Your Account is Successfully Created")
          navigate('/login')
        }
        else alert(json.message)
        setLoading(0)
      })
    } catch (error) {
      setLoading(0)
      alert("somthing went wrong try later");
    }
  }
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  return(
    <div> 
    <div><Header /></div>
    <div className="wrapper">
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            MoviesLibrary
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">Create Your Account</label></div>
        
        <div className="form-field bg-light d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text"  id="userName" placeholder="userName"  name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="confirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
        </div>
        <button className="btn  bg-warning" style={{width:'80%'}} onClick={handlesubmit}>Signup</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}        
      </div>
      <><Footer /></>
    </div>
  )
}
